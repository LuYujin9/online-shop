import ProductCardList from "../components/ProductCard/ProductCardList";
import { products } from "../../public/data";

const Homepage: React.FC = () => {
  return (
    <>
      <p>Homepage</p>
      <ProductCardList products={products} />;
    </>
  );
};
export default Homepage;
