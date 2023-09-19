import styled from "styled-components";
import ProductCard from "./ProductCard";
import { Product, User } from "../../types/global.type";

type ProductCardListProps = {
  products: Product[] | null;
  user: User | null;
  onFavorite: (id: string, isFavorite: boolean) => void;
  onShopping: (product: Product) => void;
};

const ProductCardList = ({
  products,
  user,
  onFavorite,
  onShopping,
}: ProductCardListProps) => {
  return (
    <StyledContainer>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          user={user}
          onFavorite={onFavorite}
          onShopping={onShopping}
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
