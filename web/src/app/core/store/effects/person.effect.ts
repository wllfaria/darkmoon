import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { PersonService } from '../../services/person.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { RegisterPerson, EPersonActions, RegisterPersonSuccess, RegisterPersonFailed } from '../actions/person.action';
import { map, withLatestFrom, switchMap, tap, catchError } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IPerson } from 'src/app/models/person.model';
import { of, Observable } from 'rxjs';
import { IPersonRegisterResponse } from 'src/app/models/serverResponses/personRegisterResponse.model';

@Injectable()
export class PersonEffect {
	@Effect()
	registerPerson$ = this.actions$.pipe(
		ofType<RegisterPerson>(EPersonActions.RegisterPerson),
		switchMap(({ payload }) => {
			return this.personService.register(payload)
			.pipe(
				map((res: HttpResponse<IPersonRegisterResponse>): RegisterPersonSuccess => new RegisterPersonSuccess(res)),
				catchError((err: HttpErrorResponse): Observable<RegisterPersonFailed> => of(new RegisterPersonFailed(err)))
			);
		})
	);

	constructor(
		private personService: PersonService,
		private actions$: Actions,
		private store: Store<IAppState>
	) { }
}
