import styled from "styled-components";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import uuid from "react-uuid";
import { NavLink } from "react-router-dom";
import ShoppingCartList from "../components/ShoppingCartList/ShoppingCartList";
import { User } from "../types/global.type";
import { products } from "../../public/data";

type ShoppingCartProps = {
  userName: string | null;
  users: User[] | null;
  setUsers: (newValue: User[] | null) => void;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  userName,
  users,
  setUsers,
}) => {
  const [updatedUsers, setUpdatedUsers] = useImmer<User[]>(users || []);
  const [user, setUser] = useState<User | null>(null);
  const [isShowCheckout, setIsShowCheckout] = useState(false);
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
  };

  const handleMinus = (quantity: number, id: string) => {
    if (quantity > 1) {
      setUpdatedUsers((draft) => {
        const user = draft.find((user) => user.name === userName);
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
    setCartMessage(
      "Erfoglreich bestellt. Bitte überprüfen Sie die Bestellung in Ihrem Konto."
    );
  };

  if (!user || user.shoppingCartItems.length === 0) {
    return (
      <main>
        <h5>{cartMessage}</h5>
        <StyledNavLink to="/user-account">Userkonto</StyledNavLink>
      </main>
    );
  } else {
    return (
      <main>
        {isShowCheckout ? (
          <CheckoutContainer>
            <h4>Die Gesamtpreise ist: {totalPrice.toFixed(2)} €</h4>
            <StyledForm onSubmit={handleSubmitOrder}>
              <StyledLabel htmlFor="address">Addresse:</StyledLabel>
              <textarea
                rows={3}
                id="address"
                name="address"
                minLength={15}
                required
              />
              <StyledLabel>Zalungsart:</StyledLabel>
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
              <ButtonContainer>
                <SyledButton
                  type="button"
                  onClick={() => setIsShowCheckout(!isShowCheckout)}
                >
                  Zurück
                </SyledButton>
                <SyledButton type="submit">Weiter</SyledButton>
              </ButtonContainer>
            </StyledForm>
          </CheckoutContainer>
        ) : (
          <StyledContainer>
            <ShoppingCartList
              handleShoppingCartItemDelete={handleShoppingCartItemDelete}
              user={user}
              inCartProducts={inCartProducts}
              handleMinus={handleMinus}
              handlePlus={handlePlus}
            />
            <h4>Die Gesamtpreise ist: {totalPrice.toFixed(2)} €</h4>
            <SyledButton
              type="button"
              onClick={() => setIsShowCheckout(!isShowCheckout)}
            >
              ZUR KASSE
            </SyledButton>
          </StyledContainer>
        )}
      </main>
    );
  }
};
export default ShoppingCart;

const StyledContainer = styled.div`
  margin: 4em 3% 2em 3%;
  padding: 1em;
  width: 94%;
  display: flex;
  flex-direction: column;
`;
const CheckoutContainer = styled.div`
  margin: 4em auto 2em auto;
  padding: 1em;
  width: 21em;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  background-color: white;
  @media screen and (min-width: 600px) {
    width: 30em;
  }
`;

const StyledForm = styled.form`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledLabel = styled.label`
  margin: 1em auto auto 1em;
  font-size: 1em;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-evenly;
`;

const StyledNavLink = styled(NavLink)`
  margin: 1em auto;
  width: 8em;
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 0.5em;
  color: white;
  background-color: var(--color-03);

  font-weight: bold;
  text-align: center;
  box-shadow: 1px 1px 1px 1px var(--color-04);
  display: flex;
`;

const SyledButton = styled.button`
  margin: auto;
  width: 10em;
  height: 3em;
  color: white;
  background-color: var(--color-03);
  border: none;
  border-radius: 1em;
  box-shadow: 1px 1px 1px 1px var(--color-04);
`;
