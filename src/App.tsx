import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ShoppingCart from "./pages/ShoppingCart";
import Favorite from "./pages/Favorite";
import UserAccount from "./pages/UserAccount";
import Details from "./pages/[id]";
import { users } from "../public/data";
import { User } from "./components/global.type";

type newUserData = {
  [k: string]: FormDataEntryValue;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const hangdleLogin = (newUserData: newUserData) => {
    const user = users.find(
      (user) =>
        user.name == newUserData.userName &&
        user.password == newUserData.password
    );

    if (user) {
      setUser(user);
      setIsLoggedIn(true);
      setIsShowMessage(false);
    } else {
      setIsShowMessage(true);
    }
  };

  const hangdleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsShowMessage(false);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage user={user} />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/favorite" element={<Favorite user={user} />} />
        <Route
          path="/user-account"
          element={
            <UserAccount
              user={user}
              isLoggedIn={isLoggedIn}
              isShowMessage={isShowMessage}
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
