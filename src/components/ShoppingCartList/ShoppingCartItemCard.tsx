import { Product, User } from "../global.type";

type ShoppingCartItemCardProps = {
  user: User;
  product: Product;
  handleShoppingCartItemDelete: (id: string) => void;
  handleMinus: (quantity: number) => void;
  handlePlus: (quantity: number) => void;
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
      <section>
        <h4>{product.name}</h4>
        <img
          src={product.photos[0]}
          alt="photo of product"
          className="product-photo"
        />
        <p>Preis: {product.price}€</p>
        <button onClick={() => handleMinus(quantity)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => handlePlus(quantity)}>+</button>
        <p>gesamt:{product.price * quantity}€</p>
        <button
          onClick={() => {
            handleShoppingCartItemDelete(product.id);
          }}
        >
          Entfern
        </button>
      </section>
    );
  } else {
    return (
      <p>Ooops! Etwas ist kaputt. Bitte kontaktieren Sie die Entwicklerin.</p>
    );
  }
};

export default ShoppingCartItemCard;
