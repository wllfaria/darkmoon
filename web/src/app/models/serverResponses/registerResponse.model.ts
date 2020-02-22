import { IPerson } from '../person.model';

export interface IRegisterResponse {
	person: IPerson;
	token: string;
}
