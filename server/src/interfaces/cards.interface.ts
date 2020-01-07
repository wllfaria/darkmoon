import CardFlags from "./cardFlags.interface";

export default interface Cards {
  id?: number;
  person: number;
  number: string;
  name: string;
  flag: CardFlags;
  vality: Date;
}