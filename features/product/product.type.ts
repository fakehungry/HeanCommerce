import { Cart } from '../async-storage/async-storage.type';
import { Api } from '../core/api.type';

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  amount?: string;
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

export interface GetAllCategoriesResponse extends Api<string[]> {
  data: string[];
}

export interface GetProductsByCategoryBody {
  category: string;
}

export interface GetProductsByCategoryResponse extends Api<Product[]> {
  data: Product[];
}

export interface GetMultipleProductsDetailsBody {
  carts: Cart[];
}

export interface GetMultipleProductsDetailsResponse extends Api<Product[]> {
  data: Product[];
}
