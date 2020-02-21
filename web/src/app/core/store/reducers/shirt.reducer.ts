import { IShirtState } from '../state/shirt.state';
import { ShirtActions, EShirtActions } from '../actions/shirt.action';

export const shirtReducer = (
	state: IShirtState,
	action: ShirtActions
): IShirtState => {
	switch (action.type) {
		case EShirtActions.GetShirtByUrlSuccess: {
			return {
				...state,
				currentShirt: action.payload.body
			};
		}
		case EShirtActions.GetShirtByUrlFailed: {
			return state;
		}
		default: {
			return state;
		}
	}
};
