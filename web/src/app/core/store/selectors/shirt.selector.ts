import { IAppState } from '../state/app.state';
import { IShirtState } from '../state/shirt.state';
import { createSelector } from '@ngrx/store';
import { ISku } from 'src/app/models/sku.model';

const selectShirts = (state: IAppState): IShirtState => state.shirts;

export const selectCurrentShirt = createSelector(
	selectShirts,
	(state: IShirtState): ISku => state.currentShirt
);
