import { FormGroup } from '@angular/forms';

export interface IFormState {
	registerForm: FormGroup;
	loginForm: FormGroup;
	recoveryForm: FormGroup;
}

export const initialFormState: IFormState = {
	registerForm: null,
	loginForm: null,
	recoveryForm: null
};
