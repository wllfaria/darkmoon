import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import ProductType from "./productType.model";
import Shirt from "./shirt.model";

@Table({ tableName: "product_sizes" })
export default class ProductSize extends Model<ProductSize> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id!: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
  @ForeignKey(() => ProductType)
  type_id!: number;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @BelongsTo(() => ProductType)
  type!: ProductType;

  @HasMany(() => Shirt)
  shirts!: Shirt[];
}