import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useImmer } from "use-immer";
import ShoppingCartList from "../components/ShoppingCartList/ShoppingCartList";
import { User, Product } from "../components/global.type";
import { products } from "../../public/data";

type ShoppingCartProps = {
  userName: string | null;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ userName }) => {
  const [users, setUsers] = useLocalStorage<User[] | null>("users", null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [updatedUsers, setUpdatedUsers] = useImmer<User[] | null>(users);
  const [inCartProducts, setInCartProducts] = useState<Product[] | null>(null);

  /*  const [quantity, setQuantity] = useState(initialQuantity);
  const [priceAmount, setPriceAmount] = useState(0); */

  useEffect(() => {
    if (userName && users) {
      const user = users.find((user) => user.name === userName);
      setUser(user);
      const itemsId = user?.shoppingCartItems.map((item) => item.productId);
      const inCartProducts = products.filter((product) =>
        itemsId?.includes(product.id)
      );
      setInCartProducts(inCartProducts);

      setUsers(updatedUsers);
    }
  }, [users, userName, updatedUsers, setUsers]);

  console.log(updatedUsers);

  const handleShoppingCartItemDelete = (id: string) => {
    console.log(updatedUsers);
    setUpdatedUsers((draft) => {
      const user = draft?.find((user) => user.name === userName);
      if (user) {
        user.shoppingCartItems = user.shoppingCartItems.filter(
          (item) => item.productId !== id
        );
      }
    });
    console.log(updatedUsers);
    setUsers(updatedUsers);
  };

  const handleMinus = (quantity: number) => {
    console.log(quantity);
    /*     if (quantity > 1) {
      setQuantity(quantity - 1);
    } */
  };

  const handlePlus = (quantity: number) => {
    console.log(quantity);
    /*    setQuantity(quantity + 1); */
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
