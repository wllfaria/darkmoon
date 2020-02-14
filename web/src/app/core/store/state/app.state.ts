import { RouterReducerState } from '@ngrx/router-store';
import { IPersonState, initialPersonState } from './person.state';
import { IFormState, initialFormState } from './form.state';

export interface IAppState {
	router?: RouterReducerState;
	people: IPersonState;
	forms: IFormState;
}

export const initialAppState: IAppState = {
	people: initialPersonState,
	forms: initialFormState
};
