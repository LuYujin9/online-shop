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
  orderNumber: string;
  orderedProducts: {
    productId: string;
    productName: string;
    photo: string;
    quantity: number;
  }[];
  date: string;
  adress: string;
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
  orders: {
    orderNumber: string;
    orderedProducts: {
      productId: string;
      productName: string;
      photo: string;
      quantity: number;
    }[];
    date: string;
    adress: string;
  }[];
  favorites: string[];
  shoppingCartItems: {
    productId: string;
    productName: string;
    photo: string;
    quantity: number;
  }[];
};
