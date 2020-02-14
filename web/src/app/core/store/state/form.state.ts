import { FormGroup } from '@angular/forms';

export interface IFormState {
	registerForm: FormGroup;
}

export const initialFormState: IFormState = {
	registerForm: null
};
