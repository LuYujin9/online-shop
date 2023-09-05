import ProductCardList from "../components/ProductCardList/ProductCardList";
import { products } from "../../public/data";
import { User } from "../components/global.type";

type FavoriteProps = {
  user: User | null;
};

const Favorite: React.FC<FavoriteProps> = ({ user }) => {
  const favorites = user?.favorites;
  const favoriteProducts = products.filter((product) =>
    favorites?.find((favorite) => favorite === product.id)
  );
  return (
    <>
      <ProductCardList products={favoriteProducts} />
    </>
  );
};
export default Favorite;
