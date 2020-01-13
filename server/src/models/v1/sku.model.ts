import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, ForeignKey } from "sequelize-typescript";
import Shirt from "./shirt.model";
import ProductType from "./productType.model";
import ProductImage from "./productImage.model";

@Table({ tableName: "dbo_skus" })
export default class Sku extends Model<Sku> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id!: number;
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  product_name!: string;
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  product_url!: string;
  @ForeignKey(() => ProductType)
  type_id!: number;
  @Column({ type: DataType.BOOLEAN, allowNull: false, unique: true })
  avaliable!: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @HasMany(() => Shirt)
  shirt!: Shirt[];
  @HasMany(() => ProductImage)
  images!: ProductImage[];
}