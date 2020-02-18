import { FormGroup } from '@angular/forms';

export interface IFormState {
	registerForm: FormGroup;
	loginForm: FormGroup;
}

export const initialFormState: IFormState = {
	registerForm: null,
	loginForm: null
};
