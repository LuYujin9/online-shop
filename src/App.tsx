import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
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
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userName, setUserName] = useState<string | null>("");
  const [users, setUsers] = useLocalStorage("users", [] as User[]);

  const hangdleLogin = (newUserData: newUserData) => {
    const user = users?.find(
      (user) =>
        user.name == newUserData.userName &&
        user.password == newUserData.password
    );
    if (user) {
      setUser(user);
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

  const handleFavorite = (
    id: string,
    isFavorite: boolean,
    user: User | undefined
  ) => {
    if (user) {
      let newFavorites: string[] = [];
      if (isFavorite === false) {
        newFavorites = [...user.favorites, id];
      } else {
        newFavorites = user.favorites.filter((favorite) => favorite !== id);
      }
      const updatedUser = { ...user, favorites: newFavorites };
      const updatedUsers = users.map((user) => {
        if (user.name === updatedUser.name) {
          return updatedUser;
        } else return user;
      });
      setUsers(updatedUsers);
    }
  };

  const handleShopping = (id: string, product: Product) => {
    const user = users?.find((user) => user.name == userName);
    if (user) {
      const newItem = {
        productId: id,
        productName: product.name,
        photo: product.photos[1],
        quantity: 1,
      };

      const filteredItems = user.shoppingCartItems.filter(
        (item) => item.productId !== id
      );
      const updatedShoppingCartItems = [...filteredItems, newItem];
      const upatedUser = {
        ...user,
        shoppingCartItems: updatedShoppingCartItems,
      };
      const filteredUsers = users.filter((user) => user.name !== userName);
      const upatedUsers = [...filteredUsers, upatedUser];
      setUsers(upatedUsers);
    }
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
              user={user}
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
