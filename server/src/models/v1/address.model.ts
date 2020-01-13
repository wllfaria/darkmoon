import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Person from './person.model';

@Table({ tableName: "dbo_addresses" })
export default class Address extends Model<Address> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrementIdentity: true })
	id!: number;
	@ForeignKey(() => Person)
	person_id!: number;
	@Column({ type: DataType.INTEGER, allowNull: false })
	zip_code!: number;
	@Column({ type: DataType.STRING, allowNull: false })
	district!: string;
	@Column({ type: DataType.STRING, allowNull: false })
	neighborhood!: string;
	@Column({ type: DataType.STRING, allowNull: false })
	city!: string;
	@Column({ type: DataType.STRING, allowNull: false })
	state!: string;
	@Column({ type: DataType.INTEGER, allowNull: false })
	number!: number;
	@Column({ type: DataType.STRING })
	complement!: string;

	@BelongsTo(() => Person)
	person!: Person;
}