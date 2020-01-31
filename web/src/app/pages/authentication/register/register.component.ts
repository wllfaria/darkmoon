import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from 'src/app/core/services/regex.service';
import { NgBrazilValidators } from 'ng-brazil';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
	constructor(
		private formBuilder: FormBuilder,
		private regexService: RegexService
	) {}

	private subs: SubSink = new SubSink();

  	public registerForm: FormGroup;

	ngOnInit() {
		this.createForm();
	}

	private createForm = (): void => {
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.pattern(this.regexService.emailRegex())]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]],
			cpf: ['', [Validators.required, NgBrazilValidators.cpf]]
		})
	}

	public get formControls() { return this.registerForm.controls }
	  
	public onSubmit = (): void => {
		if(this.registerForm.invalid) {
			return;
		}
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
