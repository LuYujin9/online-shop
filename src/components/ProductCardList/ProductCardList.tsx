import ProductCard from "./ProductCard";
import { Product } from "../global.type";

type ProductCardListProps = {
  products: Product[];
  user: object | null;
};

const ProductCardList = ({ products, user }: ProductCardListProps) => {
  if (products.length === 0) {
    return <p>Sie haben noch keine gespeicherte Waren.</p>;
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} user={user} />
      ))}
    </>
  );
};
export default ProductCardList;
