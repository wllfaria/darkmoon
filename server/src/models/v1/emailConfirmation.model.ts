import { Table, Column, DataType, ForeignKey, CreatedAt, UpdatedAt, DeletedAt, BelongsTo, Model } from "sequelize-typescript";
import Person from "./person.model";

@Table({ tableName: "email_confirmations" })
export default class EmailConfirmation extends Model<EmailConfirmation> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;
  @ForeignKey(() => Person)
  person_id!: number;
  @Column({ type: DataType.STRING, unique: true })
  guid!: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @BelongsTo(() => Person)
  person!: Person;
}