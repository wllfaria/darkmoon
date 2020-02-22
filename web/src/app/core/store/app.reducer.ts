import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from './state/app.state';
import { routerReducer } from '@ngrx/router-store';
import { personReducer } from './reducers/person.reducer';
import { formReducer } from './reducers/form.reducer';
import { shirtReducer } from './reducers/shirt.reducer';

export const appReducer: ActionReducerMap<IAppState, any> = {
	router: routerReducer,
	people: personReducer,
	forms: formReducer,
	shirts: shirtReducer
};
