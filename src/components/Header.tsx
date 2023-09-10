import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  FiChevronLeft,
  FiHome,
  FiShoppingCart,
  FiStar,
  FiUser,
} from "react-icons/fi";
import CartBadge from "./Cartbadge";

type HeaderProps = {
  itemCount: number;
};

const Header = ({ itemCount }: HeaderProps) => {
  const navigate = useNavigate();
  const iconStyles = { color: "white", fontSize: "1.2em" };
  return (
    <StyledHeader>
      <StyledButton onClick={() => navigate(-1)}>
        <FiChevronLeft style={iconStyles} aria-label="back" />
      </StyledButton>
      <h1>Jin's Handmade</h1>
      <StyledNav>
        <StyledNavLink to="/">
          <FiHome style={iconStyles} aria-label="back" />
        </StyledNavLink>
        <StyledNavLink to="/shopping-cart">
          <FiShoppingCart style={iconStyles} aria-label="shopping cart" />
        </StyledNavLink>
        <CartBadge itemCount={itemCount} />
        <StyledNavLink to="/favorite">
          <FiStar style={iconStyles} aria-label="favorite list" />
        </StyledNavLink>
        <StyledNavLink to="/user-account">
          <FiUser style={iconStyles} aria-label="user account" />
        </StyledNavLink>
      </StyledNav>
    </StyledHeader>
  );
};
export default Header;

const StyledButton = styled.button`
  border: none;
  background-color: var(--color-05);
`;

const StyledHeader = styled.header`
  margin: auto;
  width: 100vw;
  height: 3em;
  background-color: var(--color-05);

  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  z-index: 5;
`;

const StyledNav = styled.nav`
  margin: auto;
  margin-right: 0.5rem;
  display: flex;
`;

const StyledNavLink = styled(NavLink)`
  margin: auto;
  padding: 0.3em;
`;
