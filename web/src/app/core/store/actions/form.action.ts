import { Action } from '@ngrx/store';
import { FormGroup } from '@angular/forms';

export enum EFormActions {
	UpdateRegisterForm = '[Form] Update Register Form',
	UpdateRegisterFormSuccess = '[Form] Update Register Form Success',
	UpdateRegisterFormFailed = '[Form] Update Register Form Failed',
	GetForms = '[Form] Get Forms',
}

export class GetForms implements Action {
	public readonly type: EFormActions = EFormActions.GetForms;
	constructor(public payload: FormGroup) { }
}

export class UpdateRegisterForm implements Action {
	public readonly type: EFormActions = EFormActions.UpdateRegisterForm;
	constructor(public payload: FormGroup) { }
}

export class UpdateRegisterFormSuccess implements Action {
	public readonly type: EFormActions = EFormActions.UpdateRegisterFormSuccess;
	constructor(public payload: FormGroup) { }
}

export class UpdateRegisterFormFailed implements Action {
	public readonly type: EFormActions = EFormActions.UpdateRegisterFormFailed;
	constructor(public payload: FormGroup) { }
}

export type FormActions = | GetForms | UpdateRegisterForm | UpdateRegisterFormSuccess | UpdateRegisterFormFailed;
