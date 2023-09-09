import { useState, useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { NavLink } from "react-router-dom";
import BookmarkButton from "../BookmarkButton";
import { Product, User } from "../global.type";
import AddToCartButton from "../AddToCartButton";

type ProductCardProps = {
  product: Product;
  user: User | undefined;
  handleFavorite: (id: string, isFavorite: boolean) => void;
  handleShopping: (product: Product) => void;
};

const ProductCard = ({
  product,
  user,
  handleFavorite,
  handleShopping,
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const users: User[] | null = useReadLocalStorage("users");

  useEffect(() => {
    if (user?.favorites.includes(product.id)) {
      setIsFavorite(true);
    }
  }, [product.id, user, users]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    handleFavorite(product.id, isFavorite);
  };

  const handleAddToCart = () => {
    if (user) handleShopping(product);
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
