import { Model, Table, Column, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import Person from './person.model';

@Table({ tableName: "addresses" })
export default class Address extends Model<Address> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	id!: number;
	@ForeignKey(() => Person)
	person_id!: number;
	@Column({ type: DataType.INTEGER, allowNull: false })
	zip_code!: string;
	@Column({ type: DataType.STRING, allowNull: false })
	district!: string;
	@Column({ type: DataType.STRING, allowNull: false })
	neighborhood!: string;
	@Column({ type: DataType.STRING, allowNull: false })
	city!: string;
	@Column({ type: DataType.STRING, allowNull: false })
	state!: string;
	@Column({ type: DataType.STRING, allowNull: false })
	number!: string;
	@Column({ type: DataType.STRING })
	complement!: string;
	@CreatedAt
	created_at!: Date;
	@UpdatedAt
	updated_at!: Date;
	@DeletedAt
	deleted_at!: Date;

	@BelongsTo(() => Person)
	person!: Person;
}