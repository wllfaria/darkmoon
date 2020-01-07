import Addresses from "./addresses.interface";
import Cards from "./cards.interface";

export default interface Persons {
  id?: number;
  first_name: string;
  last_name: string;
  cpf: string;
  birthdate?: Date;
  email: string;
  password?: string;
  salt?: string;
  email_confirmed?: boolean;
  addresses?: Addresses[];
  cards?: Cards[];
}