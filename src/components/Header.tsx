import { useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiHome,
  FiShoppingCart,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <button onClick={() => navigate(-1)}>
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
          to="/user-account"
        >
          <FiUser />
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
