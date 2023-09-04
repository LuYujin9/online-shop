//import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ShoppingCart from "./pages/ShoppingCart";
import Favorite from "./pages/Favorite";
import User from "./pages/User";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/shopping-cart" Component={ShoppingCart} />
        <Route path="/favorite" Component={Favorite} />
        <Route path="/user" Component={User} />
      </Routes>
    </>
  );
}
export default App;
