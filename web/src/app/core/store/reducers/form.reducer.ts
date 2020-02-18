import { IFormState, initialFormState } from '../state/form.state';
import { FormActions, EFormActions } from '../actions/form.action';

export const formReducer = (
	state: IFormState = initialFormState,
	action: FormActions
): IFormState => {
	switch (action.type) {
		case EFormActions.UpdateRegisterForm: {
			return {
				...state,
				registerForm: action.payload
			};
		}
		case EFormActions.UpdateLoginForm: {
			return {
				...state,
				loginForm: action.payload
			};
		}
		default: {
			return state;
		}
	}
};
