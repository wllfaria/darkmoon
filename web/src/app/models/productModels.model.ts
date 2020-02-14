export default interface ProductModels {
    id?: number;
    name: string;
    type_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | undefined;
}