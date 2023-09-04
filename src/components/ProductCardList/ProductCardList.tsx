import ProductCard from "./ProductCard";
import { Product } from "../global.type";

type ProductCardListProps = {
  products: Product[];
};

const ProductCardList = ({ products }: ProductCardListProps) => {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};
export default ProductCardList;
