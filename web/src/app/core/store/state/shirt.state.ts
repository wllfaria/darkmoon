import { ISku } from 'src/app/models/sku.model';

export interface IShirtState {
    allShirts: ISku[];
}

export const initialShirtState: IShirtState = {
	allShirts: null
};
