import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, User } from "../components/global.type";
import BookmarkButton from "../components/BookmarkButton";
import { products } from "../../public/data";

type product = Product | undefined;

type DetailsProps = {
  user: User | null;
};

const Details: React.FC<DetailsProps> = ({ user }) => {
  const { id } = useParams();
  const product: product = products.find((product) => product.id == id);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && product && user?.favorites.includes(product.id)) {
      setIsFavorite(true);
    }
  }, [user, product]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
