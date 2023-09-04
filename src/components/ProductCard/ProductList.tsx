import ProductCard from "./ProductCard";
import { Product } from "../data.type";

type ProductCardListProps = {
  products: Product[];
};

const ProductCardList = ({ products }: ProductCardListProps) => {
  products.map((product) => <ProductCard product={product} />);
};
export default ProductCardList;
