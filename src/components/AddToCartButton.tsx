import { FiShoppingCart } from "react-icons/fi";

type AddToCartButtonProps = {
  handleAddToCart: () => void;
};

const AddToCartButton = ({ handleAddToCart }: AddToCartButtonProps) => {
  return (
    <button type="button" onClick={handleAddToCart}>
      <FiShoppingCart />
    </button>
  );
};

export default AddToCartButton;
