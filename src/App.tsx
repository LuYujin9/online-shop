import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ShoppingCart from "./pages/ShoppingCart";
import Favorite from "./pages/Favorite";
import UserAccount from "./pages/UserAccount";
import Details from "./pages/[id]";
import { User } from "./components/global.type";

type newUserData = {
  [k: string]: FormDataEntryValue;
};

type users = User[];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPageMessage, setUserPageMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const users: users | null = useReadLocalStorage("users");

  const hangdleLogin = (newUserData: newUserData) => {
    const user = users?.find(
      (user) =>
        user.name == newUserData.userName &&
        user.password == newUserData.password
    );

    if (user) {
      setUser(user);
      setIsLoggedIn(true);
      setUserPageMessage("");
    } else {
      setUserPageMessage(
        "Benutzername oder Passwort sind falsch, bitte probieren Sie es noch einmal."
      );
    }
  };

  const hangdleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setUserPageMessage("");
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage user={user} />} />
        <Route
          path="/shopping-cart"
          element={<ShoppingCart shoppingCartItems={user?.shoppingCartItems} />}
        />
        <Route path="/favorite" element={<Favorite user={user} />} />
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
        <Route path="/:id" element={<Details user={user} />} />
      </Routes>
    </>
  );
}
export default App;
