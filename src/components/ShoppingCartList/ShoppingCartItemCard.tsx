import { Product, User } from "../global.type";

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
      <section>
        <h4>{product.name}</h4>
        <img
          src={product.photos[0]}
          alt="photo of product"
          className="product-photo"
        />
        <p>Preis: {product.price}€</p>
        <button onClick={() => handleMinus(quantity, product.id)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => handlePlus(product.id)}>+</button>
        <p>gesamt:{(product.price * quantity).toFixed(2)}€</p>
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
