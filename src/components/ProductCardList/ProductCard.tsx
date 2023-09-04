import { Product } from "../global.type";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <>
      <section className="product-card">
        <img
          alt="product photo"
          src={product.photos[0]}
          className="product-photo"
        />

        <h4>{product.name}</h4>
        <p>{product.price}</p>
      </section>
    </>
  );
};

export default ProductCard;
