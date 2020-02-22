import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from 'src/app/core/services/regex.service';
import { Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { selectRecoveryForm } from 'src/app/core/store/selectors/form.selector';
import { selectLoggedPerson } from 'src/app/core/store/selectors/person.selector';
import { Observable } from 'rxjs';
import { IPerson } from 'src/app/models/person.model';
import { SubSink } from 'subsink';
import { IconDefinition, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ofType } from '@ngrx/effects';
import { EPersonActions, RecoveryAccountSuccess, RecoveryAccount, RecoveryAccountFailed } from 'src/app/core/store/actions/person.action';
import { UpdateRecoveryForm } from 'src/app/core/store/actions/form.action';
import { IRecoveryRequest } from 'src/app/models/serverRequests/recoveryRequest.model';
import { IRecoveryPinResponse } from 'src/app/models/serverResponses/recoveryPinResponse.model';

@Component({
	selector: 'app-recovery-email',
	templateUrl: './recovery-email.component.html',
	styleUrls: ['./recovery-email.component.scss']
})
export class RecoveryEmailComponent implements OnInit, OnDestroy {
	constructor(
		private formBuilder: FormBuilder,
		private regexService: RegexService,
		private router: Router,
		private store$: Store<IAppState>,
		private actions$: ActionsSubject
	) {
		this.recoveryForm$ = this.store$.select(selectRecoveryForm);
		this.loggedPerson$ = this.store$.select(selectLoggedPerson);
	}

	// ! Ngrx definitions
	private recoveryForm$: Observable<FormGroup>;
	private loggedPerson$: Observable<IPerson>;

	private subs: SubSink = new SubSink();

	// ! Event emitters (To app-recovery-component)
	@Output() pinReceivedEmitter: EventEmitter<string> = new EventEmitter<string>();

	// ! General variables definitions
	public recoveryForm: FormGroup;
	public formLoading: boolean;
	public formComplete: boolean;
	private recoveryData: IRecoveryRequest;

	// ! Error variable definitions
	public personDontExist: boolean;
	public requestError: boolean;

	// ! Icon definitions
	public arrowRightIcon: IconDefinition = faArrowRight;

	ngOnInit() {
		this.createForm();
		this.setupPage();
		this.checkFormCompletion();
		this.storeSubscriptions();
		this.recoveryAccountSuccessActionSubscription();
		this.recoveryAccountFailedActionSubscription();
	}

	private createForm = (): void => {
		this.recoveryForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.pattern(this.regexService.emailRegex)]]
		});
	}

	public get formControls() { return this.recoveryForm.controls; }

	private setupPage = (): void => {
		this.formLoading = false;
		this.formComplete = false;
		this.requestError = false;
		this.personDontExist = false;
	}

	private checkFormCompletion = (): void => {
		this.subs.add(this.recoveryForm.valueChanges.subscribe((): void => {
			this.recoveryForm.valid ? this.formComplete = true : this.formComplete = false;
		}));
	}

	private storeSubscriptions = (): void => {
		this.subs.add(this.recoveryForm$.subscribe((recoveryForm: FormGroup): void => {
			if (!recoveryForm) { return; }
			this.recoveryForm.patchValue(recoveryForm);
		}));

		this.subs.add(this.loggedPerson$.subscribe((loggedPerson: IPerson): void => {
			if (!loggedPerson) { return; }
			this.navigate('');
		}));
	}

	private recoveryAccountSuccessActionSubscription = (): void => {
		this.subs.add(this.actions$.pipe(
			ofType(EPersonActions.RecoveryAccountSuccess)).subscribe((action: RecoveryAccountSuccess): void => {
				this.formLoading = false;
				this.pinReceivedEmitter.emit(this.recoveryData.email);
			}
		));
	}

	private recoveryAccountFailedActionSubscription = (): void => {
		this.subs.add(this.actions$.pipe(
			ofType(EPersonActions.RecoveryAccountFailed)).subscribe((action: RecoveryAccountFailed): void => {
				this.formLoading = false;
				action.payload.status < 500 ? this.personDontExist = true : this.requestError = true;
			}
		));
	}

	public onSubmit = (): void => {
		this.formLoading = true;
		if (this.recoveryForm.invalid) { return; }
		this.dispatchRecoveryForm();
		this.dispatchRecoveryAction();
	}

	private dispatchRecoveryForm = (): void => {
		this.store$.dispatch(new UpdateRecoveryForm(this.recoveryForm));
	}

	private dispatchRecoveryAction = (): void => {
		this.recoveryData = this.recoveryForm.value as IRecoveryRequest;
		this.store$.dispatch(new RecoveryAccount(this.recoveryData));
	}

	public navigate = (pageUrl: string): void => {
		this.router.navigate([pageUrl]);
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
