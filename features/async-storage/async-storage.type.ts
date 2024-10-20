export type AsyncStorageValue = string | object;

export type Cart = {
  productId: string;
  amount: string;
};

export enum AsyncStorageKeys {
  CART = 'cart',
}
