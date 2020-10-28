import { IShirtState, initialShirtState } from '../state/shirt.state';
import { ShirtActions, EShirtActions } from '../actions/shirt.action';

export const shirtReducer = (
	state: IShirtState = initialShirtState,
	action: ShirtActions
): IShirtState => {
	switch (action.type) {
        case EShirtActions.GetShirtByUrlSuccess: {
            return {
                ...state,
                allShirts: action.payload.body
            }
        }
		default: {
			return state;
		}
	}
};
