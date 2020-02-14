import { IPerson } from '../person.model';

export interface IPersonRegisterResponse {
	person: IPerson;
	token: string;
}