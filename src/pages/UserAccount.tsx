import { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import OrderList from "../components/OrderList";
import { User } from "../components/global.type";

type UserAccountProps = {
  userName: string | null;
  onUpdateLoginStatus: (loggedInUserName: string | null) => void;
  isLoggedIn: boolean;
};

const UserAccount: React.FC<UserAccountProps> = ({
  userName,
  onUpdateLoginStatus,
  isLoggedIn,
}) => {
  const [users, setUsers] = useLocalStorage<User[] | null>("users", null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const registerPasswordRef = useRef<HTMLInputElement | null>(null);
  const [registerName, setRegisterName] = useState("");
  const [isShowRegisterForm, setIsShowRegisterForm] = useState(false);
  const [RegisterMessage, setRegisterMessage] = useState("");
  const [userPageMessage, setUserPageMessage] = useState("");

  useEffect(() => {
    const user = users?.find((user) => user.name == userName);
    setUser(user);
  }, [users, userName]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newUserData = Object.fromEntries(formData);
    const user = users?.find(
      (user) =>
        user.name == newUserData.userName &&
        user.password == newUserData.password
    );
    if (user) {
      onUpdateLoginStatus(user.name);
      setUserPageMessage("");
    } else {
      setUserPageMessage(
        "Benutzername oder Passwort sind falsch, bitte probieren Sie es noch einmal."
      );
    }
  };

  const hangdleLogout = () => {
    onUpdateLoginStatus(null);
    setUserPageMessage("");
  };

  const toggleShowRegisterForm: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setUserPageMessage("");
    setIsShowRegisterForm(!isShowRegisterForm);
  };

  const handleName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newName: string = event.target.value;
    const names: string[] = [];
    if (users) {
      users.forEach((user) => names.push(user.name));
    }
    if (names.includes(newName)) {
      setRegisterMessage(
        "Es gibt diesen Benutzernamen bereits. Bitte wählen Sie einen anderen."
      );
    } else {
      setRegisterMessage("");
      setRegisterName(newName);
    }
  };

  const handleRegister: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    if (
      registerPasswordRef.current &&
      registerPasswordRef.current.value &&
      registerName.length !== 0
    ) {
      const registerPassword: string = registerPasswordRef.current.value;
      const newUser: User = {
        name: registerName,
        password: registerPassword,
        orders: [],
        favorites: [],
        shoppingCartItems: [],
      };
      let updatedUsers;
      if (users) {
        updatedUsers = [...users, newUser];
      } else {
        updatedUsers = [newUser];
      }
      setUsers(updatedUsers);
      setUserPageMessage(
        "Regestierung war erfolgreich.Bitte melden Sie sich jetzt an"
      );
      setRegisterName("");
      setIsShowRegisterForm(false);
    } else {
      setRegisterMessage(
        "Regestrierung war nicht erfolgreich. Bitte geben Sie einen gültigen Benutzername und Passwort ein."
      );
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <main>
          <p>Hallo,{user?.name}. Wellkommen zurück!</p>
          <button onClick={hangdleLogout}>Abmelden</button>
          <OrderList orders={user?.orders} />
        </main>
      ) : (
        <main>
          {isShowRegisterForm ? (
            <section>
              <button onClick={toggleShowRegisterForm}>Zur Anmeldung</button>
              <form>
                <label htmlFor="new-user-name">Benutzername:</label>
                <input
                  type="text"
                  name="userName"
                  id="new-user-name"
                  onChange={handleName}
                  required
                />
                <p>{RegisterMessage}</p>
                <label htmlFor="new-password">Passwort:</label>
                <input
                  type="password"
                  name="password"
                  id="new-password"
                  ref={registerPasswordRef}
                  required
                />
                <button
                  type="submit"
                  onClick={(event) => handleRegister(event)}
                >
                  Registrieren
                </button>
              </form>
            </section>
          ) : (
            <div>
              <section>
                <form onSubmit={(event) => handleLogin(event)}>
                  <label htmlFor="user-name">Benutzername:</label>
                  <input type="text" name="userName" id="user-name" required />
                  <label htmlFor="password">Passwort:</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                  />
                  <button type="submit">Anmelden</button>
                </form>
                <p>{userPageMessage}</p>
              </section>
              <section>
                <p>Haben Sie noch kein Konto? Registrieren Sie sich.</p>
                <button onClick={toggleShowRegisterForm}>Registrieren</button>
              </section>
            </div>
          )}
        </main>
      )}
    </>
  );
};
export default UserAccount;
