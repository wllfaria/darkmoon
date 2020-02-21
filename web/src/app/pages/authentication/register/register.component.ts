import { Component, OnInit, OnDestroy, Query } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from 'src/app/core/services/regex.service';
import { SubSink } from 'subsink';
import { PersonService } from 'src/app/core/services/person.service';
import { Router } from '@angular/router';
import { faArrowRight, IconDefinition, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { IPerson } from 'src/app/models/person.model';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import {
	EPersonActions,
	RegisterPerson,
	RegisterPersonSuccess,
	RegisterPersonFailed
} from 'src/app/core/store/actions/person.action';
import { selectRegisterForm } from 'src/app/core/store/selectors/form.selector';
import { selectLoggedPerson } from 'src/app/core/store/selectors/person.selector';
import { UpdateRegisterForm } from 'src/app/core/store/actions/form.action';
import { ofType } from '@ngrx/effects';
import { IRegisterRequest } from 'src/app/models/serverRequests/registerRequest.model';
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
	constructor(
		private formBuilder: FormBuilder,
		private regexService: RegexService,
		private personService: PersonService,
		private router: Router,
		private store$: Store<IAppState>,
		private actions$: ActionsSubject
	) {
		this.registerForm$ = this.store$.select(selectRegisterForm);
		this.loggedPerson$ = this.store$.select(selectLoggedPerson);
	}

	// ! Ngrx definitions
	private registerForm$: Observable<FormGroup>;
	private loggedPerson$: Observable<IPerson>;

	private subs: SubSink = new SubSink();

	public registerForm: FormGroup;
	public formLoading: boolean;
	public formComplete: boolean;
	public showPassword: boolean;
	public showConfirmation: boolean;
	public passwordsMatch: boolean;

	// ! Error definitions
	public userAlreadyExists: boolean;
	public requestError: boolean;

	// ! Icons
	public arrowRightIcon: IconDefinition = faArrowRight;
	public eyeIcon: IconDefinition = faEye;
	public eyeSlashIcon: IconDefinition = faEyeSlash;

	ngOnInit() {
		this.createForm();
		this.setupPage();
		this.storeSubscriptions();
		this.registerPersonSuccessActionSubscription();
		this.registerPersonFailedActionSubscription();
		this.checkFormCompletion();
	}

	private createForm = (): void => {
		this.registerForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(1)]],
			email: ['', [Validators.required, Validators.pattern(this.regexService.emailRegex)]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			confirmation: ['', [Validators.required, Validators.minLength(8)]],
			cpf: ['', [Validators.required, Validators.pattern(this.regexService.cpfRegex)]]
		},
		{
			validators: this.checkPasswords
		});
	}

	public get formControls() { return this.registerForm.controls; }

	public navigate = (pageUrl: string): void => {
		this.router.navigate([pageUrl]);
	}

	private storeSubscriptions = (): void => {
		this.subs.add(this.registerForm$.subscribe((registerForm: FormGroup) => {
			if (!registerForm) { return; }
			this.registerForm.patchValue({
				name: registerForm.value.name,
				email: registerForm.value.email,
				cpf: registerForm.value.cpf,
			});
		}));

		this.subs.add(this.loggedPerson$.subscribe((loggedPerson: IPerson) => {
			if (!loggedPerson) { return; }
			this.navigate('');
		}));
	}

	private registerPersonSuccessActionSubscription = (): void => {
		this.subs.add(this.actions$.pipe(
			ofType(EPersonActions.RegisterPersonSuccess)).subscribe((action: RegisterPersonSuccess): void => {
				this.formLoading = false;
				this.personService.setLoggedUser(action.payload.body.token);
			}
		));
	}

	private registerPersonFailedActionSubscription = (): void => {
		this.subs.add(this.actions$.pipe(
			ofType(EPersonActions.RegisterPersonFailed)).subscribe((action: RegisterPersonFailed): void => {
				this.formLoading = false;
				action.payload.status < 500 ? this.userAlreadyExists = true : this.requestError = true;
			}
		));
	}

	private setupPage = (): void => {
		this.showPassword = false;
		this.formLoading = false;
	}

	private checkFormCompletion = (): void => {
		this.subs.add(this.registerForm.valueChanges.subscribe((): void => {
			this.registerForm.valid && this.passwordsMatch ? this.formComplete = true : this.formComplete = false;
		}));
	}

	private checkPasswords = (registerForm: FormGroup): void => {
		const password: string = registerForm.get('password').value;
		const confirmation: string = registerForm.get('confirmation').value;
		password === confirmation ? this.passwordsMatch = true : this.passwordsMatch = false;
	}

	public onSubmit = (): void => {
		this.formLoading = true;
		if (this.registerForm.invalid) { return; }
		const registerData: IRegisterRequest = this.registerForm.value as IRegisterRequest;
		this.store$.dispatch(new UpdateRegisterForm(this.registerForm));
		this.store$.dispatch(new RegisterPerson(registerData));
	}

	public togglePasswordVisibility = (passwordElementReference: any): void => {
		this.showPassword = !this.showPassword;
		this.showPassword ? passwordElementReference.type = 'text' : passwordElementReference.type = 'password';
	}

	public toggleConfirmationVisibility = (confirmationElementReference: any): void => {
		this.showConfirmation = !this.showConfirmation;
		this.showConfirmation ? confirmationElementReference.type = 'text' : confirmationElementReference.type = 'password';
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
