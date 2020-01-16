import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from "sequelize-typescript";
import EmailType from "./emailType.model";

@Table({ tableName: "email_templates" })
export default class EmailTemplate extends Model<EmailTemplate> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name!: string;
  @ForeignKey(() => EmailType)
  type_id!: number;
  @Column({ type: DataType.STRING, allowNull: false })
  sender!: string;
  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;
  @Column({ type: DataType.STRING, allowNull: false })
  subject!: string;
  @Column({ type: DataType.TEXT({length: 'long'}), allowNull: false })
  html!: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @BelongsTo(() => EmailType)
  type!: EmailType;
}