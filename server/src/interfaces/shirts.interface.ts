import Images from "./images.interface";

export default interface Shirts {
  name: string;
  url: string;
  sku: number;
  color: string;
  price: string;
  size: string;
  product_type: any[];
  model: any[];
  gender: any[];
  images: Images[];
}