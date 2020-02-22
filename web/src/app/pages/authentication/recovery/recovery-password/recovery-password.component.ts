import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IRecoveryPinResponse } from 'src/app/models/serverResponses/recoveryPinResponse.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IconDefinition, faEye, faEyeSlash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'subsink';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Observable } from 'rxjs';
import { IPerson } from 'src/app/models/person.model';
import { selectLoggedPerson } from 'src/app/core/store/selectors/person.selector';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import {
	EPersonActions,
	RecoveryPassword,
	RecoveryPasswordSuccess,
	RecoveryPasswordFailed
} from 'src/app/core/store/actions/person.action';
import { IRecoveryPasswordRequest } from 'src/app/models/serverRequests/recoveryPasswordRequest.model';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
	selector: 'app-recovery-password',
	templateUrl: './recovery-password.component.html',
	styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit, OnDestroy {

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private personService: PersonService,
		private store$: Store<IAppState>,
		private action$: ActionsSubject
	) { 
		this.loggedPerson$ = this.store$.select(selectLoggedPerson);
	}

	// ! Ngrx definitions
	private loggedPerson$: Observable<IPerson>;

	private subs: SubSink = new SubSink();

	// ! Person identifier from parent
	@Input() private personIdentifier: IRecoveryPinResponse;

	// ! Error definitions
	public requestError: boolean;

	// ! General variable definitions
	public recoveryPasswordForm: FormGroup;
	public formLoading: boolean;
	public passwordsMatch: boolean;
	public showPassword: boolean;
	public showConfirmation: boolean;
	public formComplete: boolean;

	// ! Icons
	public arrowRightIcon: IconDefinition = faArrowRight;
	public eyeIcon: IconDefinition = faEye;
	public eyeSlashIcon: IconDefinition = faEyeSlash;

	ngOnInit() {
		this.createForm();
		this.setupPage();
		this.storeSubscriptions();
		this.recoveryPasswordSuccessActionSubscription();
		this.recoveryPasswordFailedActionSubscription();
		this.checkFormCompletion();
	}

	private createForm = (): void => {
		this.recoveryPasswordForm = this.formBuilder.group({
			password: ['', [Validators.required, Validators.minLength(8)]],
			confirmation: ['', [Validators.required, Validators.minLength(8)]],
		},
		{
			validators: this.checkPasswords
		}
		);
	}

	public get formControls() { return this.recoveryPasswordForm.controls; }

	public onSubmit = (): void => {
		this.formLoading = true;
		if (this.recoveryPasswordForm.invalid) { return; }
		this.dispatchRecoveryPassword();
	}

	private dispatchRecoveryPassword = (): void => {
		const recoveryPasswordData: IRecoveryPasswordRequest = {
			password: this.recoveryPasswordForm.get('password').value,
			confirmation: this.recoveryPasswordForm.get('confirmation').value,
			id: this.personIdentifier.id,
			email: this.personIdentifier.email,
			pin: this.personIdentifier.pin
		};
		this.store$.dispatch(new RecoveryPassword(recoveryPasswordData));

	}

	private setupPage = (): void => {
		this.formLoading = false;
		this.requestError = false;
		this.showPassword = false;
		this.showConfirmation = false;
		this.formComplete = false;
	}

	private checkPasswords = (recoveryPasswordForm: FormGroup): void => {
		const password: string = recoveryPasswordForm.get('password').value;
		const confirmation: string = recoveryPasswordForm.get('confirmation').value;
		password === confirmation ? this.passwordsMatch = true : this.passwordsMatch = false;
	}

	private checkFormCompletion = (): void => {
		this.subs.add(this.recoveryPasswordForm.valueChanges.subscribe((): void => {
			this.recoveryPasswordForm.valid && this.passwordsMatch ? this.formComplete = true : this.formComplete = false;
		}));
	}

	private recoveryPasswordSuccessActionSubscription = (): void => {
		this.subs.add(this.action$.pipe(
			ofType(EPersonActions.RecoveryPasswordSuccess)).subscribe((action: RecoveryPasswordSuccess): void => {
				console.log('success')
				this.formLoading = false;
				this.personService.setLoggedUser(action.payload.body.token);
			}
		));
	}

	private recoveryPasswordFailedActionSubscription = (): void => {
		this.subs.add(this.action$.pipe(
			ofType(EPersonActions.RecoveryPasswordFailed)).subscribe((action: RecoveryPasswordFailed): void => {
				this.formLoading = false;
				this.requestError = true;
			}
		));
	}

	private storeSubscriptions = (): void => {
		this.subs.add(this.loggedPerson$.subscribe((loggedPerson: IPerson) => {
			if (!loggedPerson) { return; }
			this.navigate('');
		}));
	}

	public togglePasswordVisibility = (passwordElementReference: any): void => {
		this.showPassword = !this.showPassword;
		this.showPassword ? passwordElementReference.type = 'text' : passwordElementReference.type = 'password';
	}

	public toggleConfirmationVisibility = (confirmationElementReference: any): void => {
		this.showConfirmation = !this.showConfirmation;
		this.showConfirmation ? confirmationElementReference.type = 'text' : confirmationElementReference.type = 'password';
	}

	private navigate = (pageUrl: string): void => {
		this.router.navigate([pageUrl]);
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
