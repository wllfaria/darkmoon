import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import Roles from "./roles.model";
import Permissions from "./permissions.model";

@Table({ tableName: 'roles_permissions' })
export default class RolesPermissions extends Model<RolesPermissions> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;
    @ForeignKey(() => Roles)
    role_id!: number;
    @ForeignKey(() => Permissions)
    permission_id!: number;
    @CreatedAt
    created_at!: Date;
    @UpdatedAt
    updated_at!: Date;
    @DeletedAt
    deleted_at!: Date;

    @BelongsTo(() => Roles)
    role!: Roles;
    @BelongsTo(() => Permissions)
    permission!: Permissions;
}