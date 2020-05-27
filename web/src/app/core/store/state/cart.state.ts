import { ISku } from 'src/app/models/sku.model';

export interface ICartState {
    products: ISku[]
}

export const initialCartState: ICartState = {
	products: []
};
