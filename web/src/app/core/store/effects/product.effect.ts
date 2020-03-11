import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { ShirtsService } from '../../services/shirts.service';
import { ISku } from 'src/app/models/sku.model';
import { GetCurrentProduct, EProductActions, GetCurrentProductSuccess, GetCurrentProductFailed } from '../actions/product.action';
import { Action } from '@ngrx/store';
import { ProductService } from '../../services/product.service';

@Injectable()
export class ProductEffect {
    @Effect()
    getCurrentProduct$ = this.actions$.pipe(
		ofType<GetCurrentProduct>(EProductActions.GetCurrentProduct),
		switchMap(({ payload }): Observable<GetCurrentProductSuccess | GetCurrentProductFailed> => {
            console.log(payload);
			return this.productService.getCurrentProduct(payload)
			.pipe(
				map((res: HttpResponse<ISku>): GetCurrentProductSuccess => new GetCurrentProductSuccess(res)),
				catchError((err: HttpErrorResponse): Observable<GetCurrentProductFailed> => of(new GetCurrentProductFailed(err)))
			);
		})
	);

	constructor(
		private productService: ProductService,
		private actions$: Actions
	) { }
}