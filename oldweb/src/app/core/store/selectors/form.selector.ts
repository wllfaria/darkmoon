import { createSelector, MemoizedSelector, State } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IFormState } from '../state/form.state';
import { FormGroup } from '@angular/forms';

const selectForms = (state: IAppState): IFormState => state.forms;

export const selectRegisterForm: MemoizedSelector<IAppState, FormGroup> = createSelector(
	selectForms,
	(state: IFormState): FormGroup => state.registerForm
);

export const selectLoginForm: MemoizedSelector<IAppState, FormGroup> = createSelector(
	selectForms,
	(state: IFormState): FormGroup => state.loginForm
);

export const selectRecoveryForm: MemoizedSelector<IAppState, FormGroup> = createSelector(
	selectForms,
	(state: IFormState): FormGroup => state.recoveryForm
);
