import { ISku } from 'src/app/models/sku.model';
import { IShirtState } from './shirt.state';

export interface IProductState {
    currentProduct: ISku;
    shirts: IShirtState;
}

export const initialProductState: IProductState = {
    currentProduct: null,
    shirts: null
};
