import styled from "styled-components";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import BookmarkButton from "../BookmarkButton";
import { Product, User } from "../../types/global.type";
import AddToCartButton from "../AddToCartButton";

type ProductCardProps = {
  product: Product;
  user: User | null;
  onFavorite: (id: string, isFavorite: boolean) => void;
  onShopping: (product: Product) => void;
};

const ProductCard = ({
  product,
  user,
  onFavorite,
  onShopping,
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user?.favorites.includes(product.id)) {
      setIsFavorite(true);
    }
  }, [product.id, user]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (user) {
      onFavorite(product.id, isFavorite);
    } else {
      alert("Bitte melden Sie sich an.");
    }
  };

  const handleAddToCart = () => {
    if (user) {
      onShopping(product);
    } else {
      alert("Bitte melden Sie sich an.");
    }
  };

  return (
    <StyledSection>
      <NavLink to={`/${product.id}`}>
        <StyledImg alt="product photo" src={product.photos[0]} />
      </NavLink>
      <DescriptionContainer>
        <h3>{product.price} €</h3>
        <h4>{product.name}</h4>
      </DescriptionContainer>
      <BookmarkButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      <AddToCartButton handleAddToCart={handleAddToCart} />
    </StyledSection>
  );
};

export default ProductCard;

const StyledSection = styled.section`
  margin-bottom: 1em;
  width: 100%;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 80vw;
  @media screen and (min-width: 600px) {
    height: 35vw;
  }
  @media screen and (min-width: 900px) {
    height: 25vw;
  }
`;

const DescriptionContainer = styled.div`
  margin: 0;
  padding: 0.5em 0;
  width: 100%;
  border-radius: 1em;
  background-color: white;
`;
