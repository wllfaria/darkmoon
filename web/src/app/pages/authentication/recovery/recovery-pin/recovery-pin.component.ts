import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { IconDefinition, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { RecoveryPin, EPersonActions, RecoveryPinSuccess, RecoveryPinFailed } from 'src/app/core/store/actions/person.action';
import { IRecoveryPinRequest } from 'src/app/models/serverRequests/recoveryPinRequest.model';
import { Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Observable } from 'rxjs';
import { IPerson } from 'src/app/models/person.model';
import { selectLoggedPerson } from 'src/app/core/store/selectors/person.selector';
import { ofType } from '@ngrx/effects';
import { IRecoveryPinResponse } from 'src/app/models/serverResponses/recoveryPinResponse.model';
import { RegexService } from 'src/app/core/services/regex.service';

@Component({
	selector: 'app-recovery-pin',
	templateUrl: './recovery-pin.component.html',
	styleUrls: ['./recovery-pin.component.scss']
})
export class RecoveryPinComponent implements OnInit, OnDestroy {

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private regexService: RegexService,
		private store$: Store<IAppState>,
		private actions$: ActionsSubject
	) {
		this.loggedPerson$ = this.store$.select(selectLoggedPerson);
	}

	// ! Ngrx definitions
	private loggedPerson$: Observable<IPerson>;

	// ! Person email from parent
	@Input() private personEmail: string;

	// ! Event emitters (To app-recovery-component)
	@Output() public pinConfirmedEmitter: EventEmitter<IRecoveryPinResponse> = new EventEmitter<IRecoveryPinResponse>();

	private subs: SubSink = new SubSink();

	// ! General variable definitions
	public recoveryPinForm: FormGroup;
	public formComplete: boolean;
	public formLoading: boolean;

	// ! Error variable definitions
	public incorrectPin: boolean;
	public requestError: boolean;

	// ! Icon definitions
	public arrowRightIcon: IconDefinition = faArrowRight;

	ngOnInit() {
		this.setupPage();
		this.createForm();
		this.checkFormCompletion();
		this.storeSubscriptions();
		this.recoveryPinSuccessActionSubscription();
		this.recoveryPinFailedActionSubscription();
	}

	private setupPage = (): void => {
		this.formLoading = false;
		this.requestError = false;
		this.incorrectPin = false;
		this.formComplete = false;
	}

	private createForm = (): void => {
		this.recoveryPinForm = this.formBuilder.group({
			pin: [
				'',
				[
					Validators.required,
					Validators.pattern(this.regexService.pinRegex)
				]
			]
		});
	}

	public get formControls() { return this.recoveryPinForm.controls; }

	private checkFormCompletion = (): void => {
		this.subs.add(this.recoveryPinForm.valueChanges.subscribe((): void => {
			this.recoveryPinForm.valid ? this.formComplete = true : this.formComplete = false;
		}));
	}

	private storeSubscriptions = (): void => {
		this.subs.add(this.loggedPerson$.subscribe((loggedPerson: IPerson): void => {
			if (!loggedPerson) { return; }
			this.navigate('');
		}));
	}

	public onSubmit = (): void => {
		this.formLoading = true;
		if (this.recoveryPinForm.invalid) { return; }
		this.dispatchRecoveryPinEffect();
	}

	private dispatchRecoveryPinEffect = (): void => {
		const pinData: IRecoveryPinRequest = {
			pin: this.recoveryPinForm.get('pin').value as number,
			email: this.personEmail,
		};
		this.store$.dispatch(new RecoveryPin(pinData));
	}

	private recoveryPinSuccessActionSubscription = (): void => {
		this.subs.add(this.actions$.pipe(
			ofType(EPersonActions.RecoveryPinSuccess)).subscribe((action: RecoveryPinSuccess): void => {
				this.formLoading = false;
				console.log(action.payload);
				this.pinConfirmedEmitter.emit(action.payload.body);
			}
		));
	}

	private recoveryPinFailedActionSubscription = (): void => {
		this.subs.add(this.actions$.pipe(
			ofType(EPersonActions.RecoveryPinFailed)).subscribe((action: RecoveryPinFailed): void => {
				this.formLoading = false;
				action.payload.status < 500 ? this.incorrectPin = true : this.requestError = true;
			}
		));
	}

	public navigate = (pageUrl: string): void => {
		this.router.navigate([pageUrl]);
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}

}
