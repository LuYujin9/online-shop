import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";

type AddToCartButtonProps = {
  handleAddToCart: () => void;
};

const AddToCartButton = ({ handleAddToCart }: AddToCartButtonProps) => {
  const iconStyles = { color: "white", fontSize: "1.6em" };
  return (
    <StyledButton type="button" onClick={handleAddToCart}>
      <FiShoppingCart style={iconStyles} />
    </StyledButton>
  );
};

export default AddToCartButton;

const StyledButton = styled.button`
  width: 5em;
  height: 2.5em;
  background-color: var(--color-03);
  border: none;
  border-radius: 1.5em;

  position: relative;
  left: 70%;
  bottom: 5em;
`;
