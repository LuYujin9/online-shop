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
        <NavLink activeclassname="active-link" className="header-link" to="/">
          <FiHome />
        </NavLink>
        <NavLink
          activeclassname="active-link"
          className="header-link"
          to="/shopping-cart"
        >
          <FiShoppingCart />
        </NavLink>
        <NavLink
          activeclassname="active-link"
          className="header-link"
          to="/favorite"
        >
          <FiStar />
        </NavLink>
        <NavLink
          activeclassname="active-link"
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
