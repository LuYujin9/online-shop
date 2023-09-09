import styled from "styled-components";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { products } from "../../public/data";
import { User, Product } from "../components/global.type";

type FavoriteProps = {
  userName: string | null;
  handleFavorite: (id: string, isFavorite: boolean) => void;
  handleShopping: (product: Product) => void;
};

const Favorite: React.FC<FavoriteProps> = ({
  userName,
  handleFavorite,
  handleShopping,
}) => {
  const users = useReadLocalStorage<User[] | null>("users");
  const [favoriteProducts, setFavoriteProducts] = useState<
    Product[] | undefined
  >(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const user = users?.find((user) => user.name == userName);
    setUser(user);
    const favorites = user?.favorites;
    const filteredProducts = products.filter((product) =>
      favorites?.find((favorite) => favorite === product.id)
    );
    setFavoriteProducts(filteredProducts);
  }, [users, userName]);

  if (favoriteProducts?.length === 0) {
    return (
      <h4>
        Sie haben noch keine gespeicherte Waren oder sich noch nicht angemeldet.
      </h4>
    );
  }

  return (
    <main>
      <StyledSection>
        <ProductCardList
          products={favoriteProducts}
          user={user}
          handleFavorite={handleFavorite}
          handleShopping={handleShopping}
        />
      </StyledSection>
    </main>
  );
};
export default Favorite;

const StyledSection = styled.section`
  margin: 4em auto;
  width: 94%;
`;
