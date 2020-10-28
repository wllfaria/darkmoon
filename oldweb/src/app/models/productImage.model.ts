export interface IProductImage {
	id?: number;
	url: string;
	alt: string;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
	sku_id: number;
}
