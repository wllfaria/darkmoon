import { IAppState } from '../state/app.state';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ISku } from 'src/app/models/sku.model';
import { IProductState } from '../state/product.state';

const selectProducts = (state: IAppState): IProductState => state.products;

export const selectCurrentProduct: MemoizedSelector<IAppState, ISku> = createSelector(
	selectProducts,
	(state: IProductState): ISku => state.currentProduct
);
