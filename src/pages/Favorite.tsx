import styled from "styled-components";
import { useEffect, useState } from "react";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { products } from "../../public/data";
import { User, Product } from "../types/global.type";

type FavoriteProps = {
  userName: string | null;
  user: User | null;
  onFavorite: (id: string, isFavorite: boolean) => void;
  onShopping: (product: Product) => void;
};

const Favorite: React.FC<FavoriteProps> = ({
  userName,
  user,
  onFavorite,
  onShopping,
}) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[] | null>(
    null
  );

  useEffect(() => {
    const favorites = user?.favorites;
    const filteredProducts = products.filter((product) =>
      favorites?.find((favorite) => favorite === product.id)
    );
    filteredProducts
      ? setFavoriteProducts(filteredProducts)
      : setFavoriteProducts(null);
  }, [user, userName]);

  if (favoriteProducts?.length === 0) {
    return (
      <main>
        <h5>
          {userName
            ? "Sie haben noch keine gespeicherte Waren."
            : "Sie haben sich noch nicht angemeldet."}
        </h5>
      </main>
    );
  }

  return (
    <main>
      <StyledSection>
        <ProductCardList
          products={favoriteProducts}
          user={user}
          onFavorite={onFavorite}
          onShopping={onShopping}
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
