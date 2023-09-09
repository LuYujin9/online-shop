import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useImmer } from "use-immer";
import uuid from "react-uuid";
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
  const [isShowKasse, setIsShowKasse] = useState(false);
  const [cartMessage, setCartMessage] = useState(
    "Sie haben noch keine gespeicherte Waren oder sich noch nicht angemeldet."
  );

  useEffect(() => {
    if (updatedUsers !== null) {
      setUsers(updatedUsers);
    }
  }, [updatedUsers, setUsers]);

  useEffect(() => {
    const user = users?.find((user) => user.name === userName);
    setUser(user ? user : null);
  }, [users, userName, setUser]);

  const itemsId = user?.shoppingCartItems.map((item) => item.productId);
  const inCartProducts = products.filter((product) =>
    itemsId?.includes(product.id)
  );

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

  const handleSubmitOrder: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newOrderData = Object.fromEntries(formData);
    setUpdatedUsers((draft) => {
      const user = draft?.find((user) => user.name === userName);
      if (user) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const formattedDate = `${day}-${month}-${year}`;
        const newOrder = {
          orderNumber: uuid(),
          orderedProducts: user.shoppingCartItems,
          date: formattedDate,
          adress: newOrderData.address.toString(),
        };
        user.shoppingCartItems = [];
        user.orders = [...user.orders, newOrder];
      }
    });
    setUsers(updatedUsers);
    setCartMessage(
      "Erfoglreich bestellt. Bitte siehen Sie die Bestellung in Ihrem Konto."
    );
  };

  if (!user || user.shoppingCartItems.length === 0) {
    return <p>{cartMessage}</p>;
  } else {
    return (
      <>
        {isShowKasse ? (
          <section>
            <p>Die Gesamtpreis ist :{totalPrice}</p>
            <form onSubmit={handleSubmitOrder}>
              <label htmlFor="address">Addresse:</label>
              <input type="text" id="address" name="address" required />
              <h4>Zalungsart:</h4>
              <div>
                <input
                  type="radio"
                  value="paypal"
                  id="paypal"
                  name="payment"
                  defaultChecked
                />
                <label htmlFor="paypal">Paypal</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="transfer"
                  id="transfer"
                  name="payment"
                />
                <label htmlFor="transfer">Überweisung</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="creditCard"
                  id="creditCard"
                  name="payment"
                />
                <label htmlFor="creditCard">Kreditkarte</label>
              </div>
              <button type="submit">Weiter</button>
            </form>
          </section>
        ) : (
          <section>
            <ShoppingCartList
              handleShoppingCartItemDelete={handleShoppingCartItemDelete}
              user={user}
              inCartProducts={inCartProducts}
              handleMinus={handleMinus}
              handlePlus={handlePlus}
            />
            <p>Die Gesamtpreis ist :{totalPrice}</p>
            <button type="button" onClick={() => setIsShowKasse(!isShowKasse)}>
              ZUR KASSE
            </button>
          </section>
        )}
      </>
    );
  }
};
export default ShoppingCart;
