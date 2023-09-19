import ShoppingCartItemCard from "./ShoppingCartItemCard";
import { User, Product } from "../../types/global.type";

type ShoppingCartListProps = {
  user: User;
  inCartProducts: Product[] | null;
  onDeleteItemInCart: (id: string) => void;
  onReduceQuantityInCart: (quantity: number, id: string) => void;
  onIncreaseQuantityInCart: (id: string) => void;
};

const ShoppingCartList = ({
  user,
  inCartProducts,
  onDeleteItemInCart,
  onReduceQuantityInCart,
  onIncreaseQuantityInCart,
}: ShoppingCartListProps) => {
  if (inCartProducts) {
    return (
      <>
        {inCartProducts.map((inCartCardProduct) => (
          <ShoppingCartItemCard
            user={user}
            product={inCartCardProduct}
            onDeleteItemInCart={onDeleteItemInCart}
            onReduceQuantityInCart={onReduceQuantityInCart}
            onIncreaseQuantityInCart={onIncreaseQuantityInCart}
            key={inCartCardProduct.id}
          />
        ))}
      </>
    );
  } else {
    return (
      <p>Ooops! Etwas ist kaputt. Bitte kontaktieren Sie die Entwicklerin.</p>
    );
  }
};

export default ShoppingCartList;
