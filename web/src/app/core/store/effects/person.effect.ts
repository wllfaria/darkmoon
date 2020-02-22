import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { PersonService } from '../../services/person.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import {
	RegisterPerson,
	EPersonActions,
	RegisterPersonSuccess,
	RegisterPersonFailed,
	LoginPerson,
	LoginPersonSuccess,
	LoginPersonFailed,
	RecoveryAccount,
	RecoveryAccountSuccess,
	RecoveryAccountFailed,
	RecoveryPin,
	RecoveryPinSuccess,
	RecoveryPinFailed,
	RecoveryPassword,
	RecoveryPasswordSuccess,
	RecoveryPasswordFailed
} from '../actions/person.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IRegisterResponse } from 'src/app/models/serverResponses/registerResponse.model';
import { ILoginResponse } from 'src/app/models/serverResponses/loginResponse.model';
import { IRecoveryPinResponse } from 'src/app/models/serverResponses/recoveryPinResponse.model';
import { IRecoveryPasswordResponse } from 'src/app/models/serverResponses/recoveryPasswordResponse.model';

@Injectable()
export class PersonEffect {
	@Effect()
	registerPerson$ = this.actions$.pipe(
		ofType<RegisterPerson>(EPersonActions.RegisterPerson),
		switchMap(({ payload }): Observable<RegisterPersonSuccess | RegisterPersonFailed> => {
			return this.personService.register(payload)
			.pipe(
				map((res: HttpResponse<IRegisterResponse>): RegisterPersonSuccess => new RegisterPersonSuccess(res)),
				catchError((err: HttpErrorResponse): Observable<RegisterPersonFailed> => of(new RegisterPersonFailed(err)))
			);
		})
	);

	@Effect()
	loginPerson$ = this.actions$.pipe(
		ofType<LoginPerson>(EPersonActions.LoginPerson),
		switchMap(({ payload }): Observable<LoginPersonSuccess | LoginPersonFailed> => {
			return this.personService.login(payload)
			.pipe(
				map((res: HttpResponse<ILoginResponse>): LoginPersonSuccess => new LoginPersonSuccess(res)),
				catchError((err: HttpErrorResponse): Observable<LoginPersonFailed> => of(new LoginPersonFailed(err)))
			);
		})
	);

	@Effect()
	recoveryAccount$ = this.actions$.pipe(
		ofType<RecoveryAccount>(EPersonActions.RecoveryAccount),
		switchMap(({ payload }): Observable<RecoveryAccountSuccess | RecoveryAccountFailed> => {
			return this.personService.recoveryAccount(payload)
			.pipe(
				map((res: HttpResponse<any>): RecoveryAccountSuccess => new RecoveryAccountSuccess(res)),
				catchError((err: HttpErrorResponse): Observable<RecoveryAccountFailed> => of(new RecoveryAccountFailed(err)))
			);
		})
	);

	@Effect()
	recoveryPin$ = this.actions$.pipe(
		ofType<RecoveryPin>(EPersonActions.RecoveryPin),
		switchMap(({ payload }): Observable<RecoveryPinSuccess | RecoveryPinFailed> => {
			return this.personService.confirmRecoveryPin(payload)
			.pipe(
				map((res: HttpResponse<IRecoveryPinResponse>): RecoveryPinSuccess => new RecoveryPinSuccess(res)),
				catchError((err: HttpErrorResponse): Observable<RecoveryPinFailed> => of(new RecoveryPinFailed(err)))
			);
		})
	);

	@Effect()
	recoveryPassword$ = this.actions$.pipe(
		ofType<RecoveryPassword>(EPersonActions.RecoveryPassword),
		switchMap(({ payload }): Observable<RecoveryPasswordSuccess | RecoveryPasswordFailed> => {
			return this.personService.recoveryPassword(payload)
			.pipe(
				map((res: HttpResponse<IRecoveryPasswordResponse>): RecoveryPasswordSuccess => new RecoveryPasswordSuccess(res)),
				catchError((err: HttpErrorResponse): Observable<RecoveryPasswordFailed> => of(new RecoveryPasswordFailed(err)))
			);
		})
	);

	constructor(
		private personService: PersonService,
		private actions$: Actions
	) { }
}
