import React from "react";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { products } from "../../public/data";
import { User, Product } from "../components/global.type";

type HomepageProps = {
  userName: string | null;
  handleFavorite: (
    id: string,
    isFavorite: boolean,
    user: User | undefined
  ) => void;
  handleShopping: (id: string, product: Product) => void;
};

const Homepage: React.FC<HomepageProps> = ({
  userName,
  handleFavorite,
  handleShopping,
}) => {
  return (
    <>
      <ProductCardList
        products={products}
        userName={userName}
        handleFavorite={handleFavorite}
        handleShopping={handleShopping}
      />
      ;
    </>
  );
};
export default Homepage;
