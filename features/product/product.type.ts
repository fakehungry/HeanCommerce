import { Api } from '../core/api.type';

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export interface GetAllProductResponse extends Api<Product[]> {
  data: Product[];
}

export interface GetProductDetailsBody {
  id: number;
}

export interface GetProductDetailsResponse extends Api<Product> {
  data: Product;
}
