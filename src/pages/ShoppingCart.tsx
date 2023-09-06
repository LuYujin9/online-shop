import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import ShoppingCartList from "../components/ShoppingCartList/ShoppingCartList";
import { ShoppingCartItem, User } from "../components/global.type";

type ShoppingCartProps = {
  userName: string | null;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ userName }) => {
  const users = useReadLocalStorage<User[] | null>("users");
  const [shoppingCartItems, setShoppingCartItems] = useState<
    ShoppingCartItem[] | undefined
  >(undefined);

  useEffect(() => {
    const user = users?.find((user) => user.name === userName);
    const shoppingCartItems = user?.shoppingCartItems;
    setShoppingCartItems(shoppingCartItems);
  }, [users, userName, shoppingCartItems]);

  return (
    <>
      <p>Shopping Cart</p>
      <ShoppingCartList
        userName={userName}
        shoppingCartItems={shoppingCartItems}
      />
    </>
  );
};
export default ShoppingCart;
