import { IProductState, initialProductState } from '../state/product.state';
import { ProductActions, EProductActions } from '../actions/product.action';

export const productReducer = (
	state: IProductState = initialProductState,
	action: ProductActions
): IProductState => {
	switch (action.type) {
        case EProductActions.UpdateCurrentProduct: {
            return {
                ...state,
                currentProduct: action.payload
            }
        }
        case EProductActions.GetCurrentProductSuccess: {
            return {
                ...state,
                currentProduct: action.payload.body
            }
        }
        case EProductActions.GetCurrentProductFailed: {
            return state;
        }
		default: {
			return state;
		}
	}
};
