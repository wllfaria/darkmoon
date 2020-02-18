import { Action } from '@ngrx/store';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IRegisterResponse } from 'src/app/models/serverResponses/registerResponse.model';
import { IRegisterRequest } from 'src/app/models/serverRequests/registerRequest.model';
import { ILoginRequest } from 'src/app/models/serverRequests/loginRequest.model';
import { ILoginResponse } from 'src/app/models/serverResponses/loginResponse.model';

export enum EPersonActions {
	RegisterPerson = '[Person] Register Person',
	RegisterPersonSuccess = '[Person] Register Person Success',
	RegisterPersonFailed = '[Person] Register Person Failed',
	LoginPerson = '[Person] Login Person',
	LoginPersonSuccess = '[Person] Login Person Success',
	LoginPersonFailed = '[Person] Login Person Failed',
}

export class RegisterPerson implements Action {
	public readonly type = EPersonActions.RegisterPerson;
	constructor(public payload: IRegisterRequest) { }
}

export class RegisterPersonSuccess implements Action {
	public type: EPersonActions.RegisterPersonSuccess = EPersonActions.RegisterPersonSuccess;
	constructor(public payload: HttpResponse<IRegisterResponse>) { }
}

export class RegisterPersonFailed implements Action {
	public readonly type = EPersonActions.RegisterPersonFailed;
	constructor(public payload: HttpErrorResponse) { }
}

export class LoginPerson implements Action {
	public readonly type = EPersonActions.LoginPerson;
	constructor(public payload: ILoginRequest) { }
}

export class LoginPersonSuccess implements Action {
	public readonly type = EPersonActions.LoginPersonSuccess;
	constructor(public payload: HttpResponse<ILoginResponse>) { }
}

export class LoginPersonFailed implements Action {
	public readonly type = EPersonActions.LoginPersonFailed;
	constructor(public payload: HttpErrorResponse) { }
}

export type PersonActions =
| RegisterPerson
| RegisterPersonSuccess
| RegisterPersonFailed
| LoginPerson
| LoginPersonSuccess
| LoginPersonFailed;
