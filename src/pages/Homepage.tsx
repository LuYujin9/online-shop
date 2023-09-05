import React from "react";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { products } from "../../public/data";

type HomepageProps = {
  user: object | null;
};

const Homepage: React.FC<HomepageProps> = ({ user }) => {
  return (
    <>
      <p>Homepage</p>
      <ProductCardList products={products} user={user} />;
    </>
  );
};
export default Homepage;
