import { useRef, useState, useEffect } from "react";
import { users } from "../../public/data";
import { User } from "../components/global.type";
import OrderList from "../components/OrderList";

const UserAccount: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const divElement = elementRef.current;
    console.log(divElement);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newUserData = Object.fromEntries(formData);
    console.log(newUserData);
    const user = users.find(
      (user) =>
        /*   console.log("user.name", user.name);
      console.log("user.password", user.password);
      console.log("newUserData.userName", newUserData.userName);
      console.log("newUserData.password", newUserData.password); */
        user.name == newUserData.userName &&
        user.password == newUserData.password
    );
    console.log(user);
    if (user) {
      setUser(user);
      setIsLoggedIn(true);
      setIsShowMessage(false);
    } else {
      setIsShowMessage(true);
    }
  };

  // const CurrentUser = { userName: userName, password: password };
  // console.log(CurrentUser);
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsShowMessage(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <div ref={elementRef}>
          <p>{user?.name}</p>
          <button onClick={handleLogout}>Abmelden</button>
          <OrderList orders={user?.orders} />
        </div>
      ) : (
        <form onSubmit={(event) => handleSubmit(event)}>
          <label htmlFor="user-name">Username:</label>
          <input type="text" name="userName" id="user-name" required />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required />
          <button type="submit">Anmelden</button>
        </form>
      )}
      {isShowMessage && (
        <p>
          Username and Password passen nicht, bitte probieren Sie noch einmal.
        </p>
      )}
    </>
  );
};
export default UserAccount;
