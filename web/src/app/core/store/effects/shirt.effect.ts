import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { PersonService } from '../../services/person.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { ShirtsService } from '../../services/shirts.service';
import { GetShirtByUrl, GetShirtByUrlSuccess, GetShirtByUrlFailed, EShirtActions } from '../actions/shirt.action';
import { ISku } from 'src/app/models/sku.model';

@Injectable()
export class PersonEffect {
	@Effect()
	currentShirt$ = this.actions$.pipe(
		ofType<GetShirtByUrl>(EShirtActions.GetShirtByUrl),
		switchMap(({ payload }): Observable<GetShirtByUrlSuccess | GetShirtByUrlFailed> => {
			return this.shirtsService.getByUrl(payload)
			.pipe(
				map((res: HttpResponse<ISku>): GetShirtByUrlSuccess => new GetShirtByUrlSuccess(res)),
				catchError((err: HttpErrorResponse): Observable<GetShirtByUrlFailed> => of(new GetShirtByUrlFailed(err)))
			);
		})
	);

	constructor(
		private shirtsService: ShirtsService,
		private actions$: Actions
	) { }
}
