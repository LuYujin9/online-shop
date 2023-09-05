export type Product = {
  id: string;
  name: string;
  description: string;
  stock: number;
  comments: string[];
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

export type ShoppingCartItem = {
  productId: string;
  productName: string;
  quantity: number;
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
  ShoppingCartItems: {
    productId: string;
    productName: string;
    quantity: number;
  }[];
};
