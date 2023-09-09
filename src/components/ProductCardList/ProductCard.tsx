import styled from "styled-components";
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
    if (user) {
      handleFavorite(product.id, isFavorite);
    } else {
      alert("Bitte melden Sie sich an.");
    }
  };

  const handleAddToCart = () => {
    if (user) {
      handleShopping(product);
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
        <h3>€{product.price}</h3>
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
`;

const DescriptionContainer = styled.div`
  margin: 0;
  padding: 0.5em 0;
  width: 100%;
  border-radius: 15px;
  background-color: white;
`;
