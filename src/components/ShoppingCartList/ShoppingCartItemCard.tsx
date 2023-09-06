import { useState } from "react";
import { ShoppingCartItem } from "../global.type";

type ShoppingCartItemCardProps = {
  shoppingCartItem: ShoppingCartItem | undefined;
};

const ShoppingCartItemCard = ({
  shoppingCartItem,
}: ShoppingCartItemCardProps) => {
  const [quantity, setQuantity] = useState(shoppingCartItem?.quantity);

  const handleMinus = () => {
    if (quantity && quantity > 1) setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    if (quantity) setQuantity(quantity + 1);
  };

  return (
    <section>
      <h4>{shoppingCartItem?.productName}</h4>
      <img
        src={shoppingCartItem?.photo}
        alt="photo of product"
        className="product-photo"
      />
      <button onClick={handleMinus}>-</button>
      <p>{quantity}</p>
      <button onClick={handlePlus}>+</button>
    </section>
  );
};

export default ShoppingCartItemCard;
