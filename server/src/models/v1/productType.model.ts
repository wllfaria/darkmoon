import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany } from "sequelize-typescript";
import Sku from "./sku.model";
import ProductModel from "./productModel.model";

@Table({ tableName: "dbo_product_types" })
export default class ProductType extends Model<ProductType> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id!: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @HasMany(() => ProductModel)
  model!: ProductModel[];
  @HasMany(() => Sku)
  sku!: Sku[];
}