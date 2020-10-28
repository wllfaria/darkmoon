import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import EventEntity from "./eventEntity.model";
import Event from "./event.model";

@Table({ tableName: "event_types" })
export default class EventType extends Model<EventType> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name!: string;
    @ForeignKey(() => EventEntity)
    entity_id!: number;
    @CreatedAt
    created_at!: Date;
    @UpdatedAt
    updated_at!: Date;
    @DeletedAt
    deleted_at!: Date;

    @BelongsTo(() => EventEntity)
    entity!: EventEntity;

    @HasMany(() => Event)
    events!: Event[];
}