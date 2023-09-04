import { NavLinkProps as BaseNavLinkProps } from "react-router-dom";

declare module "react-router-dom" {
  interface NavLinkProps extends BaseNavLinkProps {
    activeclassname?: string;
  }
}

declare module "../data" {
  export const products: {
    id: number;
    name: string;
    colors: string[];
    sizes: string[];
    description: string;
    stock: number;
    comments: string[];
    isFavorite: boolean;
    isInShoppingCart: boolean;
    photos: string[];
    price: number;
  }[];

  export const users: {
    name: string;
    password: string;
    orders: {
      id: number;
      quantity: number;
      adress: string;
    }[];
    favorites: number[];
    shoppingCart: {
      id: number;
      quantity: number;
    }[];
  }[];
}
