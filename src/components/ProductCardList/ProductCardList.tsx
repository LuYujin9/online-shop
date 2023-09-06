import ProductCard from "./ProductCard";
import { Product } from "../global.type";

type ProductCardListProps = {
  products: Product[];
  userName: string | null;
};

const ProductCardList = ({ products, userName }: ProductCardListProps) => {
  if (products.length === 0) {
    return (
      <p>
        Sie haben noch keine gespeicherte Waren oder sich noch nicht angemeldet.
      </p>
    );
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} userName={userName} />
      ))}
    </>
  );
};
export default ProductCardList;
