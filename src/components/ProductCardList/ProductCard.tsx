import { useState, useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { NavLink } from "react-router-dom";
import BookmarkButton from "../BookmarkButton";
import { Product, User } from "../global.type";
import AddToCartButton from "../AddToCartButton";

type ProductCardProps = {
  product: Product;
  userName: string | null;
  handleFavorite: (
    id: string,
    isFavorite: boolean,
    user: User | undefined
  ) => void;
  handleShopping: (id: string, product: Product) => void;
};

const ProductCard = ({
  product,
  userName,
  handleFavorite,
  handleShopping,
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const users: User[] | null = useReadLocalStorage("users");

  useEffect(() => {
    const user = users?.find((user) => user.name == userName);
    setUser(user);
    if (user?.favorites.includes(product.id)) {
      setIsFavorite(true);
    }
  }, [product.id, userName, users]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    handleFavorite(product.id, isFavorite, user);
  };

  const handleAddToCart = () => {
    if (user) handleShopping(product.id, product);
  };

  return (
    <>
      <BookmarkButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      <AddToCartButton handleAddToCart={handleAddToCart} />
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
