import { RouterReducerState } from '@ngrx/router-store';
import { IPersonState, initialPersonState } from './person.state';
import { IFormState, initialFormState } from './form.state';
import { IShirtState, initialShirtState } from './shirt.state';

export interface IAppState {
	router?: RouterReducerState;
	people: IPersonState;
	forms: IFormState;
	shirts: IShirtState;
}

export const initialAppState: IAppState = {
	people: initialPersonState,
	forms: initialFormState,
	shirts: initialShirtState
};
