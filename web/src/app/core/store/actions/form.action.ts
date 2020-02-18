import { Action } from '@ngrx/store';
import { FormGroup } from '@angular/forms';

export enum EFormActions {
	UpdateRegisterForm = '[Form] Update Register Form',
	UpdateLoginForm = '[Form] Update Login Form'
}

export class UpdateRegisterForm implements Action {
	public readonly type: EFormActions = EFormActions.UpdateRegisterForm;
	constructor(public payload: FormGroup) { }
}

export class UpdateLoginForm implements Action {
	public readonly type: EFormActions = EFormActions.UpdateLoginForm;
	constructor(public payload: FormGroup) { }
}

export type FormActions = | UpdateRegisterForm | UpdateLoginForm;
