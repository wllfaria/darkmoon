import { Action } from '@ngrx/store';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IRegisterResponse } from 'src/app/models/serverResponses/registerResponse.model';
import { IRegisterRequest } from 'src/app/models/serverRequests/registerRequest.model';
import { ILoginRequest } from 'src/app/models/serverRequests/loginRequest.model';
import { ILoginResponse } from 'src/app/models/serverResponses/loginResponse.model';
import { IRecoveryRequest } from 'src/app/models/serverRequests/recoveryRequest.model';
import { IRecoveryPinRequest } from 'src/app/models/serverRequests/recoveryPinRequest.model';
import { IRecoveryPinResponse } from 'src/app/models/serverResponses/recoveryPinResponse.model';

export enum EPersonActions {
	RegisterPerson = '[Person] Register Person',
	RegisterPersonSuccess = '[Person] Register Person Success',
	RegisterPersonFailed = '[Person] Register Person Failed',
	LoginPerson = '[Person] Login Person',
	LoginPersonSuccess = '[Person] Login Person Success',
	LoginPersonFailed = '[Person] Login Person Failed',
	RecoveryAccount = '[Person] Recovery Account',
	RecoveryAccountSuccess = '[Person] Recovery Account Success',
	RecoveryAccountFailed = '[Person] Recovery Account Failed',
	RecoveryPin = '[Person] Recovery Pin',
	RecoveryPinSuccess = '[Person] Recovery Pin Success',
	RecoveryPinFailed = '[Person] Recovery Pin Failed'
}

export class RegisterPerson implements Action {
	public readonly type: EPersonActions.RegisterPerson = EPersonActions.RegisterPerson;
	constructor(public payload: IRegisterRequest) { }
}

export class RegisterPersonSuccess implements Action {
	public readonly type: EPersonActions.RegisterPersonSuccess = EPersonActions.RegisterPersonSuccess;
	constructor(public payload: HttpResponse<IRegisterResponse>) { }
}

export class RegisterPersonFailed implements Action {
	public readonly type: EPersonActions.RegisterPersonFailed = EPersonActions.RegisterPersonFailed;
	constructor(public payload: HttpErrorResponse) { }
}

export class LoginPerson implements Action {
	public readonly type: EPersonActions.LoginPerson = EPersonActions.LoginPerson;
	constructor(public payload: ILoginRequest) { }
}

export class LoginPersonSuccess implements Action {
	public readonly type: EPersonActions.LoginPersonSuccess = EPersonActions.LoginPersonSuccess;
	constructor(public payload: HttpResponse<ILoginResponse>) { }
}

export class LoginPersonFailed implements Action {
	public readonly type: EPersonActions.LoginPersonFailed = EPersonActions.LoginPersonFailed;
	constructor(public payload: HttpErrorResponse) { }
}

export class RecoveryAccount implements Action {
	public readonly type: EPersonActions.RecoveryAccount = EPersonActions.RecoveryAccount;
	constructor(public payload: IRecoveryRequest) { }
}

export class RecoveryAccountSuccess implements Action {
	public readonly type: EPersonActions.RecoveryAccountSuccess = EPersonActions.RecoveryAccountSuccess;
	constructor(public payload: HttpResponse<ILoginResponse>) { }
}

export class RecoveryAccountFailed implements Action {
	public readonly type: EPersonActions.RecoveryAccountFailed = EPersonActions.RecoveryAccountFailed;
	constructor(public payload: HttpErrorResponse) { }
}

export class RecoveryPin implements Action {
	public readonly type: EPersonActions.RecoveryPin = EPersonActions.RecoveryPin;
	constructor(public payload: IRecoveryPinRequest) { }
}

export class RecoveryPinSuccess implements Action {
	public readonly type: EPersonActions.RecoveryPinSuccess = EPersonActions.RecoveryPinSuccess;
	constructor(public payload: HttpResponse<IRecoveryPinResponse>) { }
}

export class RecoveryPinFailed implements Action {
	public readonly type: EPersonActions.RecoveryPinFailed = EPersonActions.RecoveryPinFailed;
	constructor(public payload: HttpErrorResponse) { }
}

export type PersonActions =
| RegisterPerson
| RegisterPersonSuccess
| RegisterPersonFailed
| LoginPerson
| LoginPersonSuccess
| LoginPersonFailed
| RecoveryAccount
| RecoveryAccountSuccess
| RecoveryAccountFailed
| RecoveryPin
| RecoveryPinSuccess
| RecoveryPinFailed;
