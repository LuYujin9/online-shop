import ProductCard from "./ProductCard";
import { Product } from "../Product.type";

type ProductCardListProps = {
  products: Product[];
};

const ProductCardList = ({ products }: ProductCardListProps) => {
  return (
    <>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </>
  );
};
export default ProductCardList;