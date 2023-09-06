import ShoppingCartItemCard from "./ShoppingCartItemCard";
import { ShoppingCartItem } from "../global.type";

type ShoppingCartListProps = {
  shoppingCartItems: ShoppingCartItem[] | undefined;
};

const ShoppingCartList = ({ shoppingCartItems }: ShoppingCartListProps) => {
  return (
    <>
      {shoppingCartItems?.map((item) => (
        <ShoppingCartItemCard shoppingCartItem={item} key={item.productId} />
      ))}
    </>
  );
};

export default ShoppingCartList;
