import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany } from "sequelize-typescript";
import RolesPermissions from "./rolesPermissions.model";
import PersonRoles from "./personRoles.model";

@Table({ tableName: 'roles' })
export default class Roles extends Model<Roles> {
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

    @HasMany(() => RolesPermissions)
    rolePermissions!: RolesPermissions[];
    @HasMany(() => PersonRoles)
    personRoles!: PersonRoles[];
}