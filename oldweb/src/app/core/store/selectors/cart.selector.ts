import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ISku } from 'src/app/models/sku.model';
import { IAppState } from '../state/app.state';
import { ICartState } from '../state/cart.state';

const selectCart = (state: IAppState): ICartState => state.cart;

export const selectCurrentCart: MemoizedSelector<IAppState, ISku[]> = createSelector(
	selectCart,
	(state: ICartState): ISku[] => state.products
);
