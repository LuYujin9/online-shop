import React from "react";
import { User } from "../components/global.type";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { products } from "../../public/data";

type HomepageProps = {
  user: User | null;
};

const Homepage: React.FC<HomepageProps> = ({ user }) => {
  return (
    <>
      <ProductCardList products={products} user={user} />;
    </>
  );
};
export default Homepage;
