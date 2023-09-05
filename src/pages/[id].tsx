import { useParams } from "react-router-dom";
import { Product } from "../components/global.type";
import { products } from "../../public/data";

type product = Product | undefined;

const Details: React.FC = () => {
  const { id } = useParams();
  const product: product = products.find((product) => product.id == id);
  console.log(id);
  if (!product) {
    return <p>Ooops, etwas ist false.</p>;
  }

  return (
    <>
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
