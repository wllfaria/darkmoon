export interface ProductType {
  id?: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | undefined;
}
