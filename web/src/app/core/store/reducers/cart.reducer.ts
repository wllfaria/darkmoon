import { ICartState, initialCartState } from '../state/cart.state';
import { CartActions, ECartActions } from '../actions/cart.action';

export const cartReducer = (
	state: ICartState = initialCartState,
	action: CartActions
): ICartState => {
	switch (action.type) {
		case ECartActions.AddCartItemSuccess: {
			return {
				...state
			};
		}
		case ECartActions.GetCurrentCartSuccess: {
			return {
				...state
			}
		}
		case ECartActions.RemoveCartItemSuccess: {
			return {
				...state
			}
		}
		default: {
			return state;
		}
	}
};
