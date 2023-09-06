import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { products } from "../../public/data";
import { User, Product } from "../components/global.type";

type FavoriteProps = {
  userName: string | null;
  handleFavorite: (
    id: string,
    isFavorite: boolean,
    user: User | undefined
  ) => void;
};

const Favorite: React.FC<FavoriteProps> = ({ userName, handleFavorite }) => {
  const users = useReadLocalStorage<User[] | null>("users");
  const [favoriteProducts, setFavoriteProducts] = useState<
    Product[] | undefined
  >(undefined);

  useEffect(() => {
    const user = users?.find((user) => user.name == userName);
    const favorites = user?.favorites;
    const filteredProducts = products.filter((product) =>
      favorites?.find((favorite) => favorite === product.id)
    );
    setFavoriteProducts(filteredProducts);
  }, [users, userName]);

  return (
    <>
      <ProductCardList
        products={favoriteProducts}
        userName={userName}
        handleFavorite={handleFavorite}
      />
    </>
  );
};
export default Favorite;
