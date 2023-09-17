import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { Product, User } from "../../types/global.type";

type ShoppingCartItemCardProps = {
  user: User;
  product: Product;
  handleShoppingCartItemDelete: (id: string) => void;
  handleMinus: (quantity: number, id: string) => void;
  handlePlus: (id: string) => void;
};

const ShoppingCartItemCard = ({
  user,
  product,
  handleShoppingCartItemDelete,
  handleMinus,
  handlePlus,
}: ShoppingCartItemCardProps) => {
  const quantity = user.shoppingCartItems.find(
    (item) => item.productId === product.id
  )?.quantity;

  if (quantity) {
    return (
      <CardContainer>
        <StyledNavLink to={`/${product.id}`}>
          <StyledImg src={product.photos[0]} alt="photo of product" />
        </StyledNavLink>
        <StyledH4>{product.name}</StyledH4>
        <StyledParagraph> {product.price} €</StyledParagraph>
        <DeleteButton
          onClick={() => {
            handleShoppingCartItemDelete(product.id);
          }}
        >
          <FiTrash2 fontSize="2em" aria-label="to delete" />
        </DeleteButton>
        <QuantityChangeContainer>
          <StyledButton onClick={() => handleMinus(quantity, product.id)}>
            -
          </StyledButton>
          <p>{quantity}</p>
          <StyledButton onClick={() => handlePlus(product.id)}>+</StyledButton>
        </QuantityChangeContainer>
      </CardContainer>
    );
  } else {
    return (
      <h4>Ooops! Etwas ist kaputt. Bitte kontaktieren Sie die Entwicklerin.</h4>
    );
  }
};

export default ShoppingCartItemCard;

const CardContainer = styled.div`
  margin: 0 3%;
  padding: 0.5em 0;
  width: 94%;
  height: 7em;
  border-top: 1px solid var(--color-04);
  border-bottom: 1px solid var(--color-04);

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "a b d"
    "a c d"
    "a e e";
`;

const StyledNavLink = styled(NavLink)`
  grid-area: a;
`;

const StyledImg = styled.img`
  width: 100%;
  max-width: 10em;
  height: 100%;
  max-height: 6em;
`;

const StyledH4 = styled.h4`
  grid-area: b;
`;

const StyledParagraph = styled.p`
  grid-area: c;
`;

const DeleteButton = styled.button`
  background-color: var(--color-02);
  border: none;
  grid-area: d;
`;

const QuantityChangeContainer = styled.div`
  display: flex;
  flex-direction: row;
  grid-area: e;
`;

const StyledButton = styled.button`
  margin: auto 1em;
  width: 1.6em;
  height: 1.6em;
  border: none;
  border-radius: 0.8em;
  color: white;
  background-color: var(--color-03);
`;
