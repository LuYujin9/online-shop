import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import { Product, User } from "../types/global.type";
import BookmarkButton from "../components/BookmarkButton";
import AddToCartButton from "../components/AddToCartButton";
import { products } from "../../public/data";

type product = Product | undefined;

type DetailsProps = {
  userName: string | null;
  handleFavorite: (
    id: string,
    isFavorite: boolean,
    user: User | undefined
  ) => void;
  handleShopping: (product: Product) => void;
};

const Details: React.FC<DetailsProps> = ({
  userName,
  handleFavorite,
  handleShopping,
}) => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const users = useReadLocalStorage<User[] | null>("users");

  const product: product = products.find((product) => product.id == id);

  useEffect(() => {
    const user = users?.find((user) => user.name == userName);
    setUser(user);
    if (user && product && user?.favorites.includes(product.id)) {
      setIsFavorite(true);
    }
  }, [users, userName, product]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (product && userName) {
      handleFavorite(product.id, isFavorite, user);
    } else {
      alert("Bitte melden Sie sich an.");
    }
  };
  if (!product) {
    return <p>Ooops, etwas ist false.</p>;
  }

  const handleAddToCart = () => {
    if (userName) {
      handleShopping(product);
    } else {
      alert("Bitte melden Sie sich an.");
    }
  };

  return (
    <main>
      <StyledSection>
        <DescriptionContainer>
          <h3>{product.name}</h3>
          <h4>{product.price} €</h4>
          <BookmarkButton
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
          <AddToCartButton handleAddToCart={handleAddToCart} />
        </DescriptionContainer>
        <StyledImgContainer>
          {product.photos.map((photo) => (
            <StyledImg
              alt="product photo"
              src={photo}
              className="product-photo"
              key={photo}
            />
          ))}
        </StyledImgContainer>
        <p>{product.description}</p>
      </StyledSection>
    </main>
  );
};
export default Details;

const StyledSection = styled.section`
  margin: 4em auto;
  width: 94%;
`;

const DescriptionContainer = styled.div`
  margin: 0.5em 0;
  padding: 1em 0;
  width: 100%;
  height: 6em;
  border-radius: 1em;
  background-color: white;
  @media screen and (min-width: 600px) {
 
`;

const StyledImgContainer = styled.div`
  @media screen and (min-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2em;
    justify-content: center;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 80vw;
  @media screen and (min-width: 600px) {
    height: 40vw;
  }
`;
