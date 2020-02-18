import { IPerson } from '../person.model';

export interface IRecoveryPasswordResponse {
	person: IPerson;
	token: string;
}
