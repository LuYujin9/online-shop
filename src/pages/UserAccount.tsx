import OrderList from "../components/OrderList";
import { User } from "../components/global.type";

type UserAccountProps = {
  user: User | null;
  isLoggedIn: boolean;
  isShowMessage: boolean;
  onLogin: (newUserData: { [k: string]: FormDataEntryValue }) => void;
  onLogout: () => void;
};

const UserAccount: React.FC<UserAccountProps> = ({
  user,
  isLoggedIn,
  isShowMessage,
  onLogin,
  onLogout,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newUserData = Object.fromEntries(formData);
    onLogin(newUserData);
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <p>{user?.name}</p>
          <button onClick={onLogout}>Abmelden</button>
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
