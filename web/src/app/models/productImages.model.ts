export default interface ProductImages {
    id?: number;
    url: string;
    alt: string;
    sku_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | undefined;
}