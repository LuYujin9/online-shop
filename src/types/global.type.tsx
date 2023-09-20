export type Product = {
  id: string;
  name: string;
  sort: string;
  description: string;
  stock: number;
  comments: string[];
  photos: string[];
  price: number;
};

export type Order = {
  orderNumber: string;
  orderedProducts: {
    productId: string;
    productName: string;
    photo: string;
    quantity: number;
  }[];
  date: string;
  adress: string;
  totalPrice: number;
};

export type itemInfo = {
  productId: string;
  productName: string;
  photo: string;
  quantity: number;
};

export type User = {
  name: string;
  password: string;
  orders: Order[];
  favorites: string[];
  shoppingCartItems: itemInfo[];
};
