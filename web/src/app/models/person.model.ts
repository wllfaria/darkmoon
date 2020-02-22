import { IAddress } from './address.model';
import { ICard } from './card.model';

export interface IPerson {
	id: number | undefined;
	name: string;
	cpf: string;
	birthdate: string | null | undefined;
	email: string;
	email_confirmed: boolean;
	recovery_pin: number | null | undefined;
	password: string;
	password_old: string | null | undefined;
	password_changed: Date | null | undefined;
	salt: string;
	salt_old: string | null | undefined;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null | undefined;
	addresses: IAddress[];
	cards: ICard[];
}
