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
	RecoveryPinFailed
} from '../actions/person.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IRegisterResponse } from 'src/app/models/serverResponses/registerResponse.model';
import { ILoginResponse } from 'src/app/models/serverResponses/loginResponse.model';

@Injectable()
export class PersonEffect {
	@Effect()
	registerPerson$ = this.actions$.pipe(
		ofType<RegisterPerson>(EPersonActions.RegisterPerson),
		switchMap(({ payload }) => {
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
		switchMap(({ payload }) => {
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
		switchMap(({ payload }) => {
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
		switchMap(({ payload }) => {
			return this.personService.confirmRecoveryPin(payload)
			.pipe(
				map((res: HttpResponse<any>): RecoveryPinSuccess => new RecoveryPinSuccess(res)),
				catchError((err: HttpErrorResponse): Observable<RecoveryPinFailed> => of(new RecoveryPinFailed(err)))
			);
		})
	);

	constructor(
		private personService: PersonService,
		private actions$: Actions,
		private store: Store<IAppState>
	) { }
}
