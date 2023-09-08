import { useState, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";
import OrderList from "../components/OrderList";
import { User } from "../components/global.type";

type UserAccountProps = {
  isLoggedIn: boolean;
  userPageMessage: string;
  onLogin: (newUserData: { [k: string]: FormDataEntryValue }) => void;
  onLogout: () => void;
};

type users = User[];

const UserAccount: React.FC<UserAccountProps> = ({
  isLoggedIn,
  userPageMessage,
  onLogin,
  onLogout,
}) => {
  const [users, setUsers] = useLocalStorage("users", [] as users);
  const [registerName, setRegisterName] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);
  const registerPasswordRef = useRef<HTMLInputElement | null>(null);
  const [RegisterMessage, setRegisterMessage] = useState("");
  const [isShowRegisterForm, setIsShowRegisterForm] = useState(false);

  const names: string[] = [];
  if (users) {
    users.forEach((user) => names.push(user.name));
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newUserData = Object.fromEntries(formData);
    const user = users?.find(
      (user) =>
        user.name == newUserData.userName &&
        user.password == newUserData.password
    );
    setUser(user);
    onLogin(newUserData);
  };

  const toggleShowRegisterForm: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsShowRegisterForm(!isShowRegisterForm);
  };

  const handleName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newName: string = event.target.value;
    if (names.includes(newName)) {
      setRegisterMessage(
        "Es gibt diesen Benutzernamen bereits. Bitte wählen Sie einen anderen."
      );
    } else {
      setRegisterMessage("Der Benutzername kann nicht gewählt werden.");
      setRegisterName(newName);
    }
  };

  const handleRegister: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    if (
      !registerPasswordRef.current ||
      !registerPasswordRef.current.value ||
      registerName === ""
    ) {
      setRegisterMessage(
        "Regestrierung war nicht erfolgreich. Bitte geben Sie einen gültigen Benutzername und Passwort ein."
      );
    } else {
      const registerPassword: string = registerPasswordRef.current.value;
      const newUser: User = {
        name: registerName,
        password: registerPassword,
        orders: [],
        favorites: [],
        shoppingCartItems: [],
      };
      users.push(newUser);
      setUsers(users);
      setRegisterMessage("Regestierung war erfolgreich.");
      setRegisterName("");
      setIsShowRegisterForm(false);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <main>
          <p>{user?.name}</p>
          <button onClick={onLogout}>Abmelden</button>
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
