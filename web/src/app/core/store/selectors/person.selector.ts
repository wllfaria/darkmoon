import { createSelector } from '@ngrx/store';
import { IPersonState } from '../state/person.state';
import { IPerson } from 'src/app/models/person.model';
import { IAppState } from '../state/app.state';

const selectPeople = (state: IAppState): IPersonState => state.people;

export const selectLoggedPerson = createSelector(
	selectPeople,
	(state: IPersonState): IPerson => state.loggedPerson
);
