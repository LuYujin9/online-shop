import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import ShoppingCartList from "../components/ShoppingCartList/ShoppingCartList";
import { ShoppingCartItem, User, Product } from "../components/global.type";
import { products } from "../../public/data";

type ShoppingCartProps = {
  userName: string | null;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ userName }) => {
  const users = useReadLocalStorage<User[] | null>("users");
  const [priceAmount, setPriceAmount] = useState(0);
  const [inCartProducts, setInCartProducts] = useState<Product[] | null>(null);
  const [shoppingCartItems, setShoppingCartItems] = useState<
    ShoppingCartItem[] | undefined
  >(undefined);

  useEffect(() => {
    const user = users?.find((user) => user.name === userName);
    const shoppingCartItems = user?.shoppingCartItems;
    setShoppingCartItems(shoppingCartItems);

    if (shoppingCartItems) {
      const itemsId = shoppingCartItems.map((item) => item.productId);
      const inCartProducts = products.filter((product) =>
        itemsId.includes(product.id)
      );
      setInCartProducts(inCartProducts);
      const inCartProductsPrices = inCartProducts.map(
        (product) => product.price
      );
      const priceAmount = inCartProductsPrices.reduce((a, b) => a + b);
      setPriceAmount(priceAmount);
    }
  }, [users, userName, shoppingCartItems]);

  if (shoppingCartItems?.length === 0 || !shoppingCartItems) {
    return (
      <p>
        Sie haben noch keine gespeicherte Waren oder sich noch nicht angemeldet.
      </p>
    );
  }

  return (
    <>
      <h3>Shopping Cart</h3>
      <ShoppingCartList
        userName={userName}
        shoppingCartItems={shoppingCartItems}
        inCartProducts={inCartProducts}
      />
      <p>{priceAmount}</p>
      <button type="button">ZUR KASSE</button>
    </>
  );
};
export default ShoppingCart;
