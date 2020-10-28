import { RouterReducerState } from '@ngrx/router-store';
import { IPersonState, initialPersonState } from './person.state';
import { IFormState, initialFormState } from './form.state';
import { IProductState, initialProductState } from './product.state';
import { ICartState, initialCartState } from './cart.state';

export interface IAppState {
    router?: RouterReducerState;
	people: IPersonState;
	forms: IFormState;
	products: IProductState;
	cart: ICartState
}

export const initialAppState: IAppState = {
	people: initialPersonState,
	forms: initialFormState,
	products: initialProductState,
	cart: initialCartState
};
