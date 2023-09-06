import { ShoppingCartItem } from "../global.type";
import ShoppingCartItemCard from "./ShoppingCartItemCard";

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
