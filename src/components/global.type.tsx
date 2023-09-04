export type Product = {
  id: number;
  name: string;
  description: string;
  stock: number;
  comments: string[];
  isFavorite: boolean;
  isInShoppingCart: boolean;
  photos: string[];
  price: number;
};

export type Order = {
  id: number;
  productName: string;
  date: string;
  quantity: number;
  adress: string;
};

export type User = {
  name: string;
  password: string;
  orders: {
    id: number;
    productName: string;
    date: string;
    quantity: number;
    adress: string;
  }[];
  favorites: number[];
  shoppingCart: {
    productName: string;
    quantity: number;
  }[];
};
