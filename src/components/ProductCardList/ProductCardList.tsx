import styled from "styled-components";
import ProductCard from "./ProductCard";
import { Product, User } from "../../types/global.type";

type ProductCardListProps = {
  products: Product[] | undefined;
  user: User | undefined;
  handleFavorite: (id: string, isFavorite: boolean) => void;
  handleShopping: (product: Product) => void;
};

const ProductCardList = ({
  products,
  user,
  handleFavorite,
  handleShopping,
}: ProductCardListProps) => {
  return (
    <StyledContainer>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          user={user}
          handleFavorite={handleFavorite}
          handleShopping={handleShopping}
        />
      ))}
    </StyledContainer>
  );
};
export default ProductCardList;

const StyledContainer = styled.div`
  @media screen and (min-width: 600px) {
    margin: auto;
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2em;
  }
  @media screen and (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
