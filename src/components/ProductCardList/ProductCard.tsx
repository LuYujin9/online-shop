import { useState, useEffect } from "react";
import { Product, User } from "../global.type";
import { NavLink } from "react-router-dom";
import FavoriteButton from "../BookmarkButton";

type ProductCardProps = {
  product: Product;
  user: User | null;
};

const ProductCard = ({ product, user }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user?.favorites.includes(product.id)) {
      setIsFavorite(true);
    }
  }, [user, product.id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
