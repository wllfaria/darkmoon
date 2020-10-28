import { Component, OnInit } from '@angular/core';
import { ShirtsService } from 'src/app/core/services/shirts.service';
import { ISku } from 'src/app/models/sku.model';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { SubSink } from 'subsink';
import { ofType } from '@ngrx/effects';
import { ECartActions, GetCurrentCartSuccess, GetCurrentCart, AddCartItem, RemoveCartItem } from 'src/app/core/store/actions/cart.action';
import ArrayUtils from 'src/app/core/utils/array.utils';

type CartProductWrapper = {
	product: ISku,
	quantity: number
}

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	constructor(
		private store$: Store<IAppState>,
		private actions$: ActionsSubject
	) {
	}

	public cartLoading: boolean;
	public isCartOpen: boolean;
	public isCartEmpty: boolean;
	public products: CartProductWrapper[];
	public cartHasError: boolean;
	public suggestion: any;
	public totalPrice: number;
	public subs: SubSink = new SubSink()
	public cartLoaded: boolean;

	ngOnInit() {
		this.totalPrice = 0;
		this.getCurrentProductSuccessActionSubscription();
		this.fetchCurrentCart();
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}

	public toggleCart(): void {
		this.isCartOpen = !this.isCartOpen;

		if (this.isCartOpen) {
			this.cartLoading = true;
			this.fetchCurrentCart();
		}
	}

	public getCurrentProductSuccessActionSubscription = (): void => {
		this.subs.add(
			this.actions$.pipe(ofType<GetCurrentCartSuccess>(ECartActions.GetCurrentCartSuccess)).subscribe((action: GetCurrentCartSuccess): void => {
				this.products = [];
				this.totalPrice = 0;
				this.isCartEmpty = false;
				if (action.payload.length === 0) {
					this.isCartEmpty = true;
					return;
				}
				const groupedById = ArrayUtils.groupBy(action.payload, "id");
				for (let key in groupedById) {
					const intKey = parseInt(key);
					let element = {
						quantity: groupedById[intKey].length,
						product: groupedById[key][0]
					};
					this.products.push(element)
					if (element.product) {
						this.totalPrice += element.product.price * element.quantity;
					}
				}
				this.cartLoading = false;
			}
		))
	}

	public setProductQuantity = (quantity: number, productId: number): void => {
		const elem = this.products.find(elem => elem.product.id == productId);
		if (!elem) {
			return;
		}
		if (quantity > 0) {
			this.store$.dispatch(new AddCartItem(elem.product));
		} else {
			this.store$.dispatch(new RemoveCartItem(elem.product));
		}
		this.fetchCurrentCart();
	}

	private fetchCurrentCart = (): void => {
		this.store$.dispatch(new GetCurrentCart());
	}

	public removeFromCart(product: ISku): void {
		const elem = this.products.find(elem => elem.product.id == product.id);
		if (!elem) {
			return;
		}
		for (let i = 0; i < elem.quantity; i++) {
			this.store$.dispatch(new RemoveCartItem(elem.product));
		}
		this.fetchCurrentCart();
	}
}
