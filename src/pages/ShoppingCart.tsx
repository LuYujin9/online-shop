import ShoppingCartList from "../components/ShoppingCartList/ShoppingCartList";
import { ShoppingCartItem } from "../components/global.type";

type ShoppingCartProps = {
  shoppingCartItems: ShoppingCartItem[] | undefined;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ shoppingCartItems }) => {
  return (
    <>
      <p>Shopping Cart</p>
      <ShoppingCartList shoppingCartItems={shoppingCartItems} />
    </>
  );
};
export default ShoppingCart;
