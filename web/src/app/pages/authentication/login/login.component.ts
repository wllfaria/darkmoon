import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RegexService } from 'src/app/core/services/regex.service';
import { IconDefinition, faEye, faEyeSlash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { selectLoginForm } from 'src/app/core/store/selectors/form.selector';
import { selectLoggedPerson } from 'src/app/core/store/selectors/person.selector';
import { Observable } from 'rxjs';
import { IPerson } from 'src/app/models/person.model';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import {
	EPersonActions,
	LoginPersonSuccess,
	LoginPersonFailed,
	LoginPerson
} from 'src/app/core/store/actions/person.action';
import { PersonService } from 'src/app/core/services/person.service';
import { ILoginRequest } from 'src/app/models/serverRequests/loginRequest.model';
import { UpdateLoginForm } from 'src/app/core/store/actions/form.action';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	constructor(
		private formBuilder: FormBuilder,
		private regexService: RegexService,
		private router: Router,
		private personService: PersonService,
		private store$: Store<IAppState>,
		private actions$: ActionsSubject
	) {
		this.loginForm$ = this.store$.select(selectLoginForm);
		this.loggedPerson$ = this.store$.select(selectLoggedPerson);
	}

	// ! Ngrx definitions
	private loginForm$: Observable<FormGroup>;
	private loggedPerson$: Observable<IPerson>;

	private subs: SubSink = new SubSink();

	// ! Error definitions
	public wrongEmailOrPassword: boolean;
	public requestError: boolean;

	public loginForm: FormGroup;
	public formComplete: boolean;

	// ! General variables definitions
	public formLoading: boolean;
	public showPassword: boolean;

	// ! Icons
	public eyeIcon: IconDefinition = faEye;
	public eyeSlashIcon: IconDefinition = faEyeSlash;
	public arrowRightIcon: IconDefinition = faArrowRight;

	ngOnInit() {
		this.createForm();
		this.setupPage();
		this.storeSubscriptions();
		this.loginPersonSuccessActionSubscription();
		this.loginPersonFailedActionSubscription();
		this.checkFormCompletion();
	}

	private createForm = (): void => {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.pattern(this.regexService.emailRegex)]],
			password: ['', [Validators.required, Validators.minLength(8)]]
		});
	}

	public get formControls() { return this.loginForm.controls; }

	public onSubmit = (): void => {
		this.formLoading = true;
		if (this.loginForm.invalid) { return; }
		const loginData: ILoginRequest = this.loginForm.value as ILoginRequest;
		this.store$.dispatch(new LoginPerson(loginData));
	}

	private setupPage = (): void => {
		this.showPassword = false;
		this.formLoading = false;
	}

	private checkFormCompletion = (): void => {
		this.subs.add(this.loginForm.valueChanges.subscribe((): void => {
			this.store$.dispatch(new UpdateLoginForm(this.loginForm));
			this.loginForm.valid ? this.formComplete = true : this.formComplete = false;
		}));
	}

	private loginPersonSuccessActionSubscription = (): void => {
		this.subs.add(this.actions$.pipe(
			ofType(EPersonActions.LoginPersonSuccess)).subscribe((action: LoginPersonSuccess): void => {
				this.formLoading = false;
				this.personService.setLoggedUser(action.payload.body.token);
			}
		));
	}

	private loginPersonFailedActionSubscription = (): void => {
		this.subs.add(this.actions$.pipe(
			ofType(EPersonActions.LoginPersonFailed)).subscribe((action: LoginPersonFailed): void => {
				this.formLoading = false;
				action.payload.status < 500 ? this.wrongEmailOrPassword = true : this.requestError = true;
			}
		));
	}

	private storeSubscriptions = (): void => {
		this.subs.add(this.loginForm$.subscribe((loginForm: FormGroup): void => {
			if (!loginForm) { return; }
			this.loginForm.patchValue(loginForm);
		}));

		this.subs.add(this.loggedPerson$.subscribe((loggedPerson: IPerson) => {
			if (!loggedPerson) { return; }
			this.navigate('');
		}));
	}

	public navigate = (pageUrl: string): void => {
		this.router.navigate([pageUrl]);
	}

	public togglePasswordVisibility = (passwordElementReference: any): void => {
		this.showPassword = !this.showPassword;
		this.showPassword ? passwordElementReference.type = 'text' : passwordElementReference.type = 'password';
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}

}
