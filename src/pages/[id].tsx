import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import { Product, User } from "../components/global.type";
import BookmarkButton from "../components/BookmarkButton";
import { products } from "../../public/data";

type product = Product | undefined;

type DetailsProps = {
  userName: string | null;
  handleFavorite: (
    id: string,
    isFavorite: boolean,
    user: User | undefined
  ) => void;
};

const Details: React.FC<DetailsProps> = ({ userName, handleFavorite }) => {
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
    if (product) handleFavorite(product.id, isFavorite, user);
  };
  if (!product) {
    return <p>Ooops, etwas ist false.</p>;
  }

  return (
    <>
      <BookmarkButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      <h4>{product.name}</h4>
      <p>{product.stock}</p>
      <p>{product.price}</p>
      {product.photos.map((photo) => (
        <img
          alt="product photo"
          src={photo}
          className="product-photo"
          key={photo}
        />
      ))}
      <p>{product.description}</p>
    </>
  );
};
export default Details;
