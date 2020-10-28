import { IPerson } from 'src/app/models/person.model';

export interface IPersonState {
	loggedPerson: IPerson;
}

export const initialPersonState: IPersonState = {
	loggedPerson: null
};
