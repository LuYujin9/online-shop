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
      <section>
        <img
          src="/images/descriptionPhoto.jpg"
          alt="with description"
          className="description-photo"
        />
        <p>
          Guten Tag, mein Name ist Jin. In meinem Online-Shop fertige ich jedes
          einzelne Stück persönlich und mit größter Hingabe an. Jedes dieser
          Unikate wird von Herzen geschaffen und soll Sie in den
          bedeutungsvollsten Augenblicken Ihres Lebens begleiten.
          <br />
          Mein Logo, das zugleich meine Initialen YJ darstellt, ist wie eine
          zarte Pflanze, behutsam in meiner Hand gepflegt. Denn mein Wunsch ist
          es, dass die Herzen eines jeden Menschen mit Liebe und Geborgenheit
          erfüllt sind.
        </p>
      </section>
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
