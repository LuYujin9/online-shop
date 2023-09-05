import { ShoppingCartItem } from "./global.type";

type ShoppingCartListProps = {
  ShoppingCartItems: ShoppingCartItem[];
};

const ShoppingCartList = ({ ShoppingCartItems }: ShoppingCartListProps) => {
  return (
    <>
      {ShoppingCartItems.map((item) => {
        return (
          <section>
            <h4>{item.productName}</h4>
            <button>-</button>
            <p>{item.quantity}</p>
            <button>+</button>
          </section>
        );
      })}
    </>
  );
};

export default ShoppingCartList;
