import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, concat  } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ECartActions, GetCurrentCart, GetCurrentCartSuccess, AddCartItemSuccess, AddCartItem, RemoveCartItemSuccess } from '../actions/cart.action';
import { LocalCartService } from '../../services/localcart.service';

@Injectable()
export class CartEffect {
	@Effect()
	addCartItem$ = this.actions$.pipe(
		ofType<AddCartItem>(ECartActions.AddCartItem),
		map(({ payload }): AddCartItemSuccess => {
			this.cartService.addToStorage(payload)
			return new AddCartItemSuccess();
		})
	);

	@Effect()
	removeCartItem$ = this.actions$.pipe(
		ofType<AddCartItem>(ECartActions.RemoveCartItem),
		map(({ payload }): AddCartItemSuccess => {
			this.cartService.removeFromStorage(payload)
			return new RemoveCartItemSuccess();
		})
	);

	@Effect()
	getCurrentCart$ = this.actions$.pipe(
		ofType<GetCurrentCart>(ECartActions.GetCurrentCart),
		map((): GetCurrentCartSuccess => {
			return new GetCurrentCartSuccess(this.cartService.getCartItems())
		})
	);

	constructor(
		private cartService: LocalCartService,
		private actions$: Actions
	) { }
}
