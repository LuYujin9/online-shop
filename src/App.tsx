import "./styles/App.css";
import uuid from "react-uuid";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { useImmer } from "use-immer";
import { getUserFromLs } from "./helpers/loginAndOut";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage";
import ShoppingCart from "./pages/ShoppingCart";
import Favorite from "./pages/Favorite";
import UserAccount from "./pages/UserAccount";
import Details from "./pages/[id]";
import { User, Product } from "./types/global.type";

function App() {
  const [userName, setUserName] = useState<string | null>(getUserFromLs());
  const [isLoggedIn, setIsLoggedIn] = useState(userName ? true : false);
  const [itemCount, setItemCount] = useState(0);
  const [isShowCartMessage, setIsShowCartMessage] = useState(false);
  const [users, setUsers] = useLocalStorage<User[] | null>("users", null);
  const [updatedUsers, setUpdatedUsers] = useImmer<User[] | null>(
    users || null
  );

  useEffect(() => {
    if (updatedUsers !== null) {
      setUsers(updatedUsers);
    }
  }, [updatedUsers, setUsers]);

  useEffect(() => {
    setUserName(getUserFromLs());
  }, [isLoggedIn, userName]);

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
    } else {
      setItemCount(0);
    }
  }, [users, userName]);

  const toggleIsLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleSetNewUser = (newUser: User) => {
    if (users) {
      const newUsers = users;
      newUsers?.push(newUser);
      setUpdatedUsers(newUsers);
    } else {
      const newUsers = [newUser];
      setUpdatedUsers(newUsers);
    }
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

  const handelCancelOrder = (orderNumber: string) => {
    setUpdatedUsers((draft) => {
      const user = draft?.find((user) => user.name === userName);
      if (user) {
        user.orders = user.orders.filter(
          (order) => order.orderNumber !== orderNumber
        );
      }
    });
  };

  const handleDeleteItemInCart = (id: string) => {
    setUpdatedUsers((draft) => {
      const user = draft?.find((user) => user.name === userName);
      if (user) {
        user.shoppingCartItems = user.shoppingCartItems.filter(
          (item) => item.productId !== id
        );
      }
    });
  };

  const handleReduceQuantityInCart = (quantity: number, id: string) => {
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

  const handleIncreaseQuantityInCart = (id: string) => {
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

  const handleSetNewOrder = (address: string, totalPrice: number) => {
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
          adress: address,
          totalPrice: totalPrice,
        };
        user.shoppingCartItems = [];
        user.orders = [...user.orders, newOrder];
      }
    });
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
              onDeleteItemInCart={handleDeleteItemInCart}
              onReduceQuantityInCart={handleReduceQuantityInCart}
              onIncreaseQuantityInCart={handleIncreaseQuantityInCart}
              onSetNewOrder={handleSetNewOrder}
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
              isLoggedIn={isLoggedIn}
              onSetNewUser={handleSetNewUser}
              toggleIsLoggedIn={toggleIsLoggedIn}
              onCancelOrder={handelCancelOrder}
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
