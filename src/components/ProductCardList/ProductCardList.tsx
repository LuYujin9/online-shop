import ProductCard from "./ProductCard";
import { Product, User } from "../global.type";

type ProductCardListProps = {
  products: Product[] | undefined;
  user: User | undefined;
  handleFavorite: (id: string, isFavorite: boolean) => void;
  handleShopping: (product: Product) => void;
};

const ProductCardList = ({
  products,
  user,
  handleFavorite,
  handleShopping,
}: ProductCardListProps) => {
  return (
    <>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          user={user}
          handleFavorite={handleFavorite}
          handleShopping={handleShopping}
        />
      ))}
    </>
  );
};
export default ProductCardList;
