import ShoppingCartItemCard from "./ShoppingCartItemCard";
import { User, Product } from "../../types/global.type";

type ShoppingCartListProps = {
  user: User;
  handleShoppingCartItemDelete: (id: string) => void;
  inCartProducts: Product[] | null;
  handleMinus: (quantity: number, id: string) => void;
  handlePlus: (id: string) => void;
};

const ShoppingCartList = ({
  user,
  handleShoppingCartItemDelete,
  inCartProducts,
  handleMinus,
  handlePlus,
}: ShoppingCartListProps) => {
  if (inCartProducts) {
    return (
      <>
        {inCartProducts.map((inCartCardProduct) => (
          <ShoppingCartItemCard
            user={user}
            product={inCartCardProduct}
            handleShoppingCartItemDelete={handleShoppingCartItemDelete}
            handleMinus={handleMinus}
            handlePlus={handlePlus}
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
