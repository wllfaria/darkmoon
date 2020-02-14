import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from 'src/app/core/services/regex.service';
import { NgBrazilValidators } from 'ng-brazil';
import { SubSink } from 'subsink';
import { AuthService } from 'src/app/core/services/auth.service';
import SenderRegisterInterface from 'src/app/models/senders/senderRegister.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
	constructor(
		private formBuilder: FormBuilder,
		private regexService: RegexService,
		private authService: AuthService,
		private router: Router
	) {}

	private subs: SubSink = new SubSink();

	private formLoading: boolean;

  	public registerForm: FormGroup;

	ngOnInit() {
		this.createForm();
	}

	private createForm = (): void => {
		this.registerForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(1)]],
			email: ['', [Validators.required, Validators.pattern(this.regexService.emailRegex())]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			confirmation: ['', [Validators.required, Validators.minLength(8)]],
			cpf: ['', [Validators.required, NgBrazilValidators.cpf]]
		})
	}

	public get formControls() { return this.registerForm.controls }
	  
	public onSubmit = (): void => {
		if(this.registerForm.invalid) {
			return;
		}

		this.formLoading = true;
		const registerData: SenderRegisterInterface = <SenderRegisterInterface>this.registerForm.value;

		this.registerUser(registerData);
	}

	private registerUser = (registerData: SenderRegisterInterface): void => {
		this.authService.register(registerData).subscribe(
			(res: HttpResponse<any>): void => {
				if(res.ok) {
					this.setLoggedUser(res.body.token);
					this.navigateUser();
				}
			},
			(error: HttpErrorResponse): void => {},
			(): void => {}
		)
	}

	private setLoggedUser = (token: string): void => {
		this.authService.setLoggedUser(token);
	}

	private navigateUser = (): void => {
		this.router.navigate(['']);
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
