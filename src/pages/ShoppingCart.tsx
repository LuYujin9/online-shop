import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useImmer } from "use-immer";
import ShoppingCartList from "../components/ShoppingCartList/ShoppingCartList";
import { User } from "../components/global.type";
import { products } from "../../public/data";

type ShoppingCartProps = {
  userName: string | null;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ userName }) => {
  const [users, setUsers] = useLocalStorage<User[] | null>("users", null);
  const [updatedUsers, setUpdatedUsers] = useImmer<User[] | null>(users);
  const [user, setUser] = useState<User | null>(null);

  const itemsId = user?.shoppingCartItems.map((item) => item.productId);
  const inCartProducts = products.filter((product) =>
    itemsId?.includes(product.id)
  );

  useEffect(() => {
    setUsers(updatedUsers);
  }, [updatedUsers, setUsers]);

  useEffect(() => {
    const user = users?.find((user) => user.name === userName);
    setUser(user ? user : null);
  }, [users, userName, setUser]);

  const eachItemTotalPrices: number[] = [0];
  if (user) {
    user.shoppingCartItems.forEach((item) => {
      const index = products.findIndex(
        (product) => product.id === item.productId
      );
      const price = products[index].price;
      const eachItemTotalPrice = price * item.quantity;
      eachItemTotalPrices.push(eachItemTotalPrice);
    });
  }
  const totalPrice = eachItemTotalPrices.reduce((a, b) => a + b);

  const handleShoppingCartItemDelete = (id: string) => {
    setUpdatedUsers((draft) => {
      const user = draft?.find((user) => user.name === userName);
      if (user) {
        user.shoppingCartItems = user.shoppingCartItems.filter(
          (item) => item.productId !== id
        );
      }
    });
    setUsers(updatedUsers);
  };

  const handleMinus = (quantity: number, id: string) => {
    if (quantity > 1) {
      setUpdatedUsers((draft) => {
        const user = draft?.find((user) => user.name === userName);
        const CartItem = user?.shoppingCartItems.find(
          (item) => item.productId === id
        );
        if (user && CartItem) {
          const itemIndex = user.shoppingCartItems.findIndex(
            (item) => item.productId === id
          );
          user.shoppingCartItems[itemIndex].quantity--;
        }
      });
    }
  };

  const handlePlus = (id: string) => {
    setUpdatedUsers((draft) => {
      const user = draft?.find((user) => user.name === userName);
      const CartItem = user?.shoppingCartItems.find(
        (item) => item.productId === id
      );
      if (user && CartItem) {
        const itemIndex = user.shoppingCartItems.findIndex(
          (item) => item.productId === id
        );
        user.shoppingCartItems[itemIndex].quantity++;
      }
    });
  };

  if (user) {
    return (
      <>
        <h3>Shopping Cart</h3>
        <ShoppingCartList
          handleShoppingCartItemDelete={handleShoppingCartItemDelete}
          user={user}
          inCartProducts={inCartProducts}
          handleMinus={handleMinus}
          handlePlus={handlePlus}
        />
        <p>Die Gesamtpreis ist :{totalPrice}</p>
        <button type="button">ZUR KASSE</button>
      </>
    );
  } else {
    return (
      <p>
        Sie haben noch keine gespeicherte Waren oder sich noch nicht angemeldet.
      </p>
    );
  }
};
export default ShoppingCart;
