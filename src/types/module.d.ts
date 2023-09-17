import { NavLinkProps as BaseNavLinkProps } from "react-router-dom";
import { Product, User } from "./global.type";

declare module "react-router-dom" {
  interface NavLinkProps extends BaseNavLinkProps {
    activeclassname?: string;
  }
}

declare module "../data" {
  export const products: Product[];
  export const users: User[];
}
