import React from "react";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { products } from "../../public/data";
import { User } from "../components/global.type";

type HomepageProps = {
  userName: string | null;
  handleFavorite: (
    id: string,
    isFavorite: boolean,
    user: User | undefined
  ) => void;
};

const Homepage: React.FC<HomepageProps> = ({ userName, handleFavorite }) => {
  return (
    <>
      <ProductCardList
        products={products}
        userName={userName}
        handleFavorite={handleFavorite}
      />
      ;
    </>
  );
};
export default Homepage;
