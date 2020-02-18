import { initialPersonState, IPersonState } from '../state/person.state';
import { PersonActions, EPersonActions } from '../actions/person.action';

export const personReducer = (
	state: IPersonState = initialPersonState,
	action: PersonActions
): IPersonState => {
	switch (action.type) {
		case EPersonActions.RegisterPersonSuccess: {
			return {
				...state,
				loggedPerson: action.payload.body.person
			};
		}
		case EPersonActions.RegisterPersonFailed: {
			return state;
		}
		case EPersonActions.LoginPersonSuccess: {
			return {
				...state,
				loggedPerson: action.payload.body.person
			};
		}
		case EPersonActions.LoginPersonFailed: {
			return state;
		}
		default: {
			return state;
		}
	}
};
