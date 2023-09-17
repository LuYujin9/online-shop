import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { useImmer } from "use-immer";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage";
import ShoppingCart from "./pages/ShoppingCart";
import Favorite from "./pages/Favorite";
import UserAccount from "./pages/UserAccount";
import Details from "./pages/[id]";
import { User, Product } from "./types/global.type";

function App() {
  const [userName, setUserName] = useState<string | null>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [isShowCartMessage, setIsShowCartMessage] = useState(false);
  const [users, setUsers] = useLocalStorage<User[] | null>("users", null);
  const [updatedUsers, setUpdatedUsers] = useImmer<User[] | null>(null);

  useEffect(() => {
    if (updatedUsers !== null) {
      setUsers(updatedUsers);
    }
  }, [updatedUsers, setUsers]);

  useEffect(() => {
    const shoppingCartItems = users?.find(
      (user) => user.name === userName
    )?.shoppingCartItems;
    if (shoppingCartItems) {
      let itemCount = 0;
      for (let i = 0; i < shoppingCartItems.length; i++) {
        itemCount = itemCount + shoppingCartItems[i].quantity;
      }
      setItemCount(itemCount);
    }
  }, [users, userName]);

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
    setIsShowCartMessage(true);
    setTimeout(() => {
      setIsShowCartMessage(false);
    }, 3000);
  };
  return (
    <>
      <Header itemCount={itemCount} isShowCartMessage={isShowCartMessage} />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              userName={userName}
              users={users}
              handleFavorite={handleFavorite}
              handleShopping={handleShopping}
            />
          }
        />
        <Route
          path="/shopping-cart"
          element={
            <ShoppingCart
              userName={userName}
              users={users}
              setUsers={setUsers}
            />
          }
        />
        <Route
          path="/favorite"
          element={
            <Favorite
              userName={userName}
              users={users}
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
              users={users}
              setUsers={setUsers}
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
