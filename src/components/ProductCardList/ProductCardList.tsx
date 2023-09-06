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
};

const ProductCardList = ({
  products,
  userName,
  handleFavorite,
}: ProductCardListProps) => {
  if (products?.length === 0) {
    return (
      <p>
        Sie haben noch keine gespeicherte Waren oder sich noch nicht angemeldet.
      </p>
    );
  }

  return (
    <>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          userName={userName}
          handleFavorite={handleFavorite}
        />
      ))}
    </>
  );
};
export default ProductCardList;
