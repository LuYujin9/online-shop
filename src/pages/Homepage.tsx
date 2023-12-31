import styled from "styled-components";
import { useState } from "react";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { RiCustomerService2Fill } from "react-icons/ri";
import Filter from "../components/Filter";
import { products } from "../../public/data";
import { User, Product } from "../types/global.type";

type HomepageProps = {
  user: User | null;
  userName: string | null;
  users: User[] | null;
  onFavorite: (id: string, isFavorite: boolean) => void;
  onShopping: (product: Product) => void;
};

const Homepage: React.FC<HomepageProps> = ({
  user,
  onFavorite,
  onShopping,
}) => {
  const [productsList, setProductsList] = useState<Product[]>(products);

  const handleSetFilteredProducts = (
    selectValue: string,
    checkboxesValues: string[]
  ) => {
    const filteredProducts = products.filter((product) =>
      checkboxesValues.includes(product.sort)
    );
    if (selectValue) {
      if (selectValue === "price ascending") {
        filteredProducts.sort((a, b) => a.price - b.price);
        setProductsList(filteredProducts);
      } else if (selectValue === "price descending") {
        filteredProducts.sort((a, b) => b.price - a.price);
        setProductsList(filteredProducts);
      } else if (selectValue === "new arrivals first") {
        filteredProducts.reverse();
      }
    }
    setProductsList(filteredProducts);
  };

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
      <Filter onSetFilteredProducts={handleSetFilteredProducts} />
      <ProductCardList
        products={productsList}
        user={user}
        onFavorite={onFavorite}
        onShopping={onShopping}
      />
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
