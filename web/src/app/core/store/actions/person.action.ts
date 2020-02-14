import { Action } from '@ngrx/store';
import { ISenderRegister } from 'src/app/models/serverRequests/senderRegister.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IPersonRegisterResponse } from 'src/app/models/serverResponses/personRegisterResponse.model';

export enum EPersonActions {
	RegisterPerson = '[Person] Register Person',
	RegisterPersonSuccess = '[Person] Register Person Success',
	RegisterPersonFailed = '[Person] Register Person Failed'
}

export class RegisterPerson implements Action {
	public readonly type = EPersonActions.RegisterPerson;
	constructor(public payload: ISenderRegister) { }
}

export class RegisterPersonSuccess implements Action {
	public type: EPersonActions.RegisterPersonSuccess = EPersonActions.RegisterPersonSuccess;
	constructor(public payload: HttpResponse<IPersonRegisterResponse>) { }
}

export class RegisterPersonFailed implements Action {
	public readonly type = EPersonActions.RegisterPersonFailed;
	constructor(public payload: HttpErrorResponse) { }
}

export type PersonActions = | RegisterPerson | RegisterPersonSuccess | RegisterPersonFailed;
