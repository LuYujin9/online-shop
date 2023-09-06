import React from "react";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { products } from "../../public/data";

type HomepageProps = {
  userName: string | null;
};

const Homepage: React.FC<HomepageProps> = ({ userName }) => {
  return (
    <>
      <ProductCardList products={products} userName={userName} />;
    </>
  );
};
export default Homepage;
