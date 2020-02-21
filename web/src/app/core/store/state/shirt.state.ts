import { ISku } from 'src/app/models/sku.model';

export interface IShirtState {
	currentShirt: ISku;
}

export const initialShirtState: IShirtState = {
	currentShirt: null
};
