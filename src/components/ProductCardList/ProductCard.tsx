import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { NavLink } from "react-router-dom";
import FavoriteButton from "../BookmarkButton";
import { Product, User } from "../global.type";

type ProductCardProps = {
  product: Product;
  userName: string | null;
};

const ProductCard = ({ product, userName }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [users, setUsers] = useLocalStorage("users", [] as User[]);

  useEffect(() => {
    const user = users?.find((user) => user.name == userName);
    setUser(user);
    if (user?.favorites.includes(product.id)) {
      setIsFavorite(true);
      console.log("useEffect");
    }
  }, [product.id, userName, users]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);

    if (user) {
      let newFavorites: string[] = [];
      if (isFavorite === false) {
        newFavorites = [...user.favorites, product.id];
      } else {
        newFavorites = user.favorites.filter(
          (favorite) => favorite !== product.id
        );
      }
      const updatedUser = { ...user, favorites: newFavorites };
      const updatedUsers = users.map((user) => {
        if (user.name === updatedUser.name) {
          return updatedUser;
        } else return user;
      });

      setUsers(updatedUsers);
    }
  };

  return (
    <>
      <FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      <NavLink to={`/${product.id}`}>
        <section className="product-card">
          <img
            alt="product photo"
            src={product.photos[0]}
            className="product-photo"
          />
          <h4>{product.name}</h4>
          <p>{product.price}</p>
        </section>
      </NavLink>
    </>
  );
};

export default ProductCard;
