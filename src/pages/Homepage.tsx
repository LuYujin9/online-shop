import styled from "styled-components";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { products } from "../../public/data";
import { User, Product } from "../components/global.type";

type HomepageProps = {
  userName: string | null;
  handleFavorite: (id: string, isFavorite: boolean) => void;
  handleShopping: (product: Product) => void;
};

const Homepage: React.FC<HomepageProps> = ({
  userName,
  handleFavorite,
  handleShopping,
}) => {
  const users = useReadLocalStorage<User[] | null>("users");
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const user = users?.find((user) => user.name == userName);
    setUser(user);
  }, [users, userName]);

  return (
    <main>
      <StyledSection>
        <OwnerImg src="/images/descriptionPhoto1.jpg" alt="with description" />
        <p>
          Hi,ich bin Jin und fertige jedes einzelne Stück persönlich und mit
          größter Hingabe an. Jedes dieser Unikate wird von Herzen geschaffen.
        </p>
        <StyledImg
          src="/images/descriptionPhoto2.jpg"
          alt="with description"
          className="description-photo"
        />
        <p>
          Mein Logo, das zugleich meine Initialen YJ darstellt, ist wie eine
          zarte Pflanze, behutsam in meiner Hand gepflegt. Denn mein Wunsch ist
          es, dass die Herzen eines jeden Menschen mit Liebe und Geborgenheit
          erfüllt sind :)
        </p>
      </StyledSection>
      <ProductCardList
        products={products}
        user={user}
        handleFavorite={handleFavorite}
        handleShopping={handleShopping}
      />
      ;
    </main>
  );
};
export default Homepage;

const StyledSection = styled.section`
  margin: 4em auto;
  width: 94%;
`;

const OwnerImg = styled.img`
  width: 100%;
`;

const StyledImg = styled.img`
  margin: 0 7%;
  width: 80%;
`;
