import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import Shirt from "./shirt.model";
import ProductType from "./productType.model";
import Sku from "./sku.model";

@Table({ tableName: "models" })
export default class ProductModel extends Model<ProductModel> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id!: number;
  @ForeignKey(() => ProductType)
  type_id!: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @BelongsTo(() => ProductType, 'type_id')
  type!: ProductType;

  @HasMany(() => Sku)
  sku!: Sku;
}