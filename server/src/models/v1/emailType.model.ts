import { Table, Model, CreatedAt, UpdatedAt, DeletedAt, Column, DataType, HasMany } from "sequelize-typescript";
import EmailTemplate from "./emailTemplate.model";

@Table({ tableName: "email_types" })
export default class EmailType extends Model<EmailType> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @HasMany(() => EmailTemplate)
  templates!: EmailTemplate;
}