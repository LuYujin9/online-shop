import {
  FiChevronLeft,
  FiHome,
  FiShoppingCart,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

type HeaderProps = {
  handleGoBack?: () => void;
};

const Header = ({ handleGoBack }: HeaderProps) => {
  return (
    <header>
      <button onClick={handleGoBack}>
        <FiChevronLeft />
      </button>
      <h1>Handmade Shop</h1>
      <nav>
        <NavLink activeClassName="active-link" className="header-link" to="/">
          <FiHome />
        </NavLink>
        <NavLink
          activeClassName="active-link"
          className="header-link"
          to="/shopping-cart"
        >
          <FiShoppingCart />
        </NavLink>
        <NavLink
          activeClassName="active-link"
          className="header-link"
          to="/favorite"
        >
          <FiStar />
        </NavLink>
        <NavLink
          activeClassName="active-link"
          className="header-link"
          to="/user"
        >
          <FiUser />
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
