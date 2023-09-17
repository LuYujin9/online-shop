import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import OrderList from "../components/OrderList/OrderList";
import { User } from "../components/global.type";

type UserAccountProps = {
  userName: string | null;
  users: User[] | null;
  isLoggedIn: boolean;
  setUsers: (newValue: User[] | null) => void;
  onUpdateLoginStatus: (loggedInUserName: string | null) => void;
};

const UserAccount: React.FC<UserAccountProps> = ({
  userName,
  users,
  isLoggedIn,
  setUsers,
  onUpdateLoginStatus,
}) => {
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
          <StyledContainer>
            <h2>Hallo,{user?.name}. Wellkommen zurück!</h2>
            <StyledButton onClick={hangdleLogout}>Abmelden</StyledButton>
            <OrderList orders={user?.orders} />
          </StyledContainer>
        </main>
      ) : (
        <main>
          {isShowRegisterForm ? (
            <StyledSection>
              <StyledButton onClick={toggleShowRegisterForm}>
                Zur Anmeldung
              </StyledButton>
              <StyledForm>
                <StyledInput
                  type="text"
                  name="userName"
                  id="new-user-name"
                  onChange={handleName}
                  placeholder="Benutzername"
                  required
                />

                <StyledInput
                  type="password"
                  name="password"
                  id="new-password"
                  ref={registerPasswordRef}
                  placeholder="Passwort"
                  required
                />
                <SubmitButton
                  type="submit"
                  onClick={(event) => handleRegister(event)}
                >
                  Registrieren
                </SubmitButton>
                <p>{RegisterMessage}</p>
              </StyledForm>
            </StyledSection>
          ) : (
            <StyledSection>
              <StyledForm onSubmit={(event) => handleLogin(event)}>
                <StyledInput
                  type="text"
                  name="userName"
                  id="user-name"
                  placeholder="Benutzername"
                  required
                />

                <StyledInput
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Passwort"
                  required
                />
                <SubmitButton type="submit">Anmelden</SubmitButton>
              </StyledForm>
              <p>{userPageMessage}</p>
              <StyledDiv></StyledDiv>
              <StyledButton onClick={toggleShowRegisterForm}>
                Registrieren einen Konto
              </StyledButton>
            </StyledSection>
          )}
        </main>
      )}
    </>
  );
};
export default UserAccount;

const StyledContainer = styled.div`
  margin: 4em auto;
  width: 94%;

  display: flex;
  flex-direction: column;
`;

const StyledSection = styled.section`
  margin: auto;
  padding: 1em;
  width: 20em;
  border-radius: 0.5em;
  background-color: white;
  box-shadow: 1px 1px 15px 4px var(--color--01);

  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const StyledDiv = styled.div`
  margin: auto;
  width: 18em;
  border-bottom: 1px solid var(--color-04);
`;

const StyledButton = styled.button`
  margin: 1em auto;
  width: 14em;
  height: 3em;
  border: none;
  border-radius: 0.5em;
  color: white;
  background-color: var(--color-03);
  font-weight: bold;
  box-shadow: 1px 1px 1px 1px var(--color-04);
`;

const SubmitButton = styled.button`
  margin: 0.5em auto;
  width: 18em;
  height: 3em;
  color: white;
  background-color: var(--color-04);
  border: none;
  border-radius: 0.5em;
  font-weight: bold;
`;

const StyledInput = styled.input`
  margin: 0.5em auto;
  width: 18em;
  height: 3em;
  border: 1px solid var(--color-03);
  border-radius: 0.5em;
`;
