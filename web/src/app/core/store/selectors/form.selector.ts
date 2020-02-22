import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IFormState } from '../state/form.state';
import { FormGroup } from '@angular/forms';

const selectForms = (state: IAppState): IFormState => state.forms;

export const selectRegisterForm = createSelector(
	selectForms,
	(state: IFormState): FormGroup => state.registerForm
);

export const selectLoginForm = createSelector(
	selectForms,
	(state: IFormState): FormGroup => state.loginForm
);

export const selectRecoveryForm = createSelector(
	selectForms,
	(state: IFormState): FormGroup => state.recoveryForm
);
