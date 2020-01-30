import { ProductType } from "./productType.model";
import Shirts from './shirts.model';
import ProductImages from './productImages.model';

export interface Skus {
	id?: number;
	product_name: string;
	product_url: string;
	available: boolean;
	price: number;
	sale_price: number | undefined;
	sale_date: Date | undefined;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | undefined;
	type_id: number;
	type: ProductType;
	shirt: Shirts[];
	images: ProductImages[]
}
