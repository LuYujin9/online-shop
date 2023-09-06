import ProductCard from "./ProductCard";
import { Product, User } from "../global.type";

type ProductCardListProps = {
  products: Product[] | undefined;
  userName: string | null;
  handleFavorite: (
    id: string,
    isFavorite: boolean,
    user: User | undefined
  ) => void;
  handleShopping: (id: string, product: Product) => void;
};

const ProductCardList = ({
  products,
  userName,
  handleFavorite,
  handleShopping,
}: ProductCardListProps) => {
  return (
    <>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          userName={userName}
          handleFavorite={handleFavorite}
          handleShopping={handleShopping}
        />
      ))}
    </>
  );
};
export default ProductCardList;
