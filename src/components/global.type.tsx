export type Product = {
  id: string;
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
  id: string;
  productName: string;
  date: string;
  quantity: number;
  adress: string;
};

export type User = {
  name: string;
  password: string;
  orders: {
    id: string;
    productName: string;
    date: string;
    quantity: number;
    adress: string;
  }[];
  favorites: string[];
  shoppingCart: {
    productName: string;
    quantity: number;
  }[];
};
