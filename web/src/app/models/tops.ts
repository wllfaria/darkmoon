import { TopImages } from "./topImages";

export interface Tops {
  id: number;
  code: string;
  name: string;
  images: Array<TopImages>;
  url: string;
  price: number;
  sale_price: number;
  sale_date: Date;
  size_pp: number;
  size_p: number;
  size_m: number;
  size_g: number;
  size_gg: number;
  category: string;
  gender: string;
}
