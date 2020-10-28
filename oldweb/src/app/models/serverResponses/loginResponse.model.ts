import { IPerson } from '../person.model';

export interface ILoginResponse {
	person: IPerson;
	token: string;
}
