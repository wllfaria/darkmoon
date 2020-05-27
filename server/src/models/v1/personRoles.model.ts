import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import Roles from "./roles.model";
import Person from "./person.model";

@Table({ tableName: 'people_roles' })
export default class PersonRoles extends Model<PersonRoles> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;
    @ForeignKey(() => Roles)
    role_id!: number;
    @ForeignKey(() => Person)
    person_id!: number;
    @CreatedAt
    created_at!: Date;
    @UpdatedAt
    updated_at!: Date;
    @DeletedAt
    deleted_at!: Date;

    @BelongsTo(() => Roles)
    role!: Roles;
    @BelongsTo(() => Person)
    person!: Person;
}