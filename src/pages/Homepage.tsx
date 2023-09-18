import styled from "styled-components";
import { useEffect, useState } from "react";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { RiCustomerService2Fill } from "react-icons/ri";
import { products } from "../../public/data";
import { User, Product } from "../types/global.type";

type HomepageProps = {
  userName: string | null;
  users: User[] | null;
  handleFavorite: (id: string, isFavorite: boolean) => void;
  handleShopping: (product: Product) => void;
};

const Homepage: React.FC<HomepageProps> = ({
  userName,
  users,
  handleFavorite,
  handleShopping,
}) => {
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
        <LogoImg
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

        <StyledLink href="mailto: wuwujane@hotmail.com">
          <RiCustomerService2Fill color="white" fontSize="2em" />
          KONTACTIEREN SIE MICH
        </StyledLink>
        <p>
          Wenn Sie Fragen haben oder individuelle Artikel wünschen,zögern Sie
          nicht, mich jetzt zu kontaktieren!
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
  display: flex;
  flex-direction: column;
`;

const OwnerImg = styled.img`
  margin: auto;
  width: 100%;
  max-width: 30em;
`;

const LogoImg = styled.img`
  margin: auto;
  width: 80%;
  max-width: 20em;
`;

const StyledLink = styled.a`
  margin: 0.5em auto;
  width: 15em;
  height: 3em;
  border-radius: 1em;
  color: white;
  background-color: var(--color-03);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
