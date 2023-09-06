import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import ShoppingCartItemCard from "./ShoppingCartItemCard";
import { ShoppingCartItem, User } from "../global.type";

type ShoppingCartListProps = {
  shoppingCartItems: ShoppingCartItem[] | undefined;
  userName: string | null;
};

const ShoppingCartList = ({
  shoppingCartItems,
  userName,
}: ShoppingCartListProps) => {
  const [users, setUsers] = useLocalStorage("users", [] as User[]);
  const [user, setUser] = useState<User | undefined>(undefined);
  console.log(shoppingCartItems);

  useEffect(() => {
    const user = users?.find((user) => user.name == userName);
    setUser(user);
  }, [users, userName]);

  const handleShoppingCartItemDelete = (id: string) => {
    if (user) {
      const filteredItems = user.shoppingCartItems.filter(
        (item) => item.productId !== id
      );
      if (filteredItems) {
        const updatedUser = { ...user, shoppingCartItems: filteredItems };
        console.log("updatedUser", updatedUser);
        const updatedUsers = users.map((user) => {
          if (user.name === userName) {
            return updatedUser;
          } else return user;
        });
        console.log("updatedUsers", updatedUsers);
        setUsers(updatedUsers);
      }
    }
  };

  return (
    <>
      {shoppingCartItems?.map((item) => (
        <ShoppingCartItemCard
          shoppingCartItem={item}
          handleShoppingCartItemDelete={handleShoppingCartItemDelete}
          key={item.productId}
        />
      ))}
    </>
  );
};

export default ShoppingCartList;
