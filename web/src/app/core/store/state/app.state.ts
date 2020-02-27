import { RouterReducerState } from '@ngrx/router-store';
import { IPersonState, initialPersonState } from './person.state';
import { IFormState, initialFormState } from './form.state';
import { IProductState, initialProductState } from './product.state';
import { IShirtState, initialShirtState } from './shirt.state';

export interface IAppState {
    router?: RouterReducerState;
	people: IPersonState;
	forms: IFormState;
    products: IProductState;
}

export const initialAppState: IAppState = {
	people: initialPersonState,
	forms: initialFormState,
    products: initialProductState
};
