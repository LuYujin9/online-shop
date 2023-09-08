import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { useImmer } from "use-immer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ShoppingCart from "./pages/ShoppingCart";
import Favorite from "./pages/Favorite";
import UserAccount from "./pages/UserAccount";
import Details from "./pages/[id]";
import { User, Product } from "./components/global.type";

type newUserData = {
  [k: string]: FormDataEntryValue;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPageMessage, setUserPageMessage] = useState("");
  const [userName, setUserName] = useState<string | null>("");
  const [users, setUsers] = useLocalStorage<User[] | null>("users", null);
  const [updatedUsers, setUpdatedUsers] = useImmer<User[] | null>(users);

  useEffect(() => {
    setUsers(updatedUsers);
  }, [updatedUsers, setUsers]);

  const hangdleLogin = (newUserData: newUserData) => {
    const user = users?.find(
      (user) =>
        user.name == newUserData.userName &&
        user.password == newUserData.password
    );
    if (user) {
      setUserName(user.name);
      setIsLoggedIn(true);
      setUserPageMessage("");
    } else {
      setUserPageMessage(
        "Benutzername oder Passwort sind falsch, bitte probieren Sie es noch einmal."
      );
    }
  };

  const hangdleLogout = () => {
    setUserName(null);
    setIsLoggedIn(false);
    setUserPageMessage("");
  };

  const handleFavorite = (id: string, isFavorite: boolean) => {
    setUpdatedUsers((draft) => {
      const user = draft?.find((user) => user.name === userName);
      if (isFavorite && user) {
        user.favorites = user.favorites.filter((favorite) => favorite !== id);
      } else if (user) {
        user.favorites = [...user.favorites, id];
      }
    });
  };

  const handleShopping = (product: Product) => {
    setUpdatedUsers((draft) => {
      const user = draft?.find((user) => user.name === userName);
      if (user) {
        const newItem = {
          productId: product.id,
          productName: product.name,
          photo: product.photos[1],
          quantity: 1,
        };
        const itemIndex = user.shoppingCartItems.findIndex(
          (item) => item.productId === product.id
        );
        if (itemIndex !== -1) {
          user.shoppingCartItems[itemIndex].quantity++;
        } else {
          user.shoppingCartItems = [...user.shoppingCartItems, newItem];
        }
      }
    });
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              userName={userName}
              handleFavorite={handleFavorite}
              handleShopping={handleShopping}
            />
          }
        />
        <Route
          path="/shopping-cart"
          element={<ShoppingCart userName={userName} />}
        />
        <Route
          path="/favorite"
          element={
            <Favorite
              userName={userName}
              handleFavorite={handleFavorite}
              handleShopping={handleShopping}
            />
          }
        />
        <Route
          path="/user-account"
          element={
            <UserAccount
              isLoggedIn={isLoggedIn}
              userPageMessage={userPageMessage}
              onLogin={hangdleLogin}
              onLogout={hangdleLogout}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <Details
              userName={userName}
              handleFavorite={handleFavorite}
              handleShopping={handleShopping}
            />
          }
        />
      </Routes>
    </>
  );
}
export default App;
