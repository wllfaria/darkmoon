import Images from "../images.interface";

export default interface Shirts {
  name: string;
  url: string;
  sku: number;
  color: string;
  price: string;
  size: string;
  productType: any[];
  model: any[];
  gender: any[];
  images: Images[];
}