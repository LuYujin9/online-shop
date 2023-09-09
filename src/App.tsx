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

function App() {
  const [userName, setUserName] = useState<string | null>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useLocalStorage<User[] | null>("users", null);
  const [updatedUsers, setUpdatedUsers] = useImmer<User[] | null>(null);

  useEffect(() => {
    if (updatedUsers !== null) {
      setUsers(updatedUsers);
    }
  }, [updatedUsers, setUsers]);

  const onUpdateLoginStatus = (userName: string | null) => {
    setUserName(userName);
    setIsLoggedIn(!isLoggedIn);
  };

  const handleFavorite = (id: string, isFavorite: boolean) => {
    setUpdatedUsers(users);
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
    setUpdatedUsers(users);
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
              userName={userName}
              onUpdateLoginStatus={onUpdateLoginStatus}
              isLoggedIn={isLoggedIn}
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
