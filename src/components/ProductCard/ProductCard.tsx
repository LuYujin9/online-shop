type Product = {
  id: number;
  name: string;
  colors: string[];
  sizes: string[];
  description: string;
  stock: number;
  comments: string[];
  isFavorite: boolean;
  isInShoppingCart: boolean;
  photos: string[];
  price: number;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <>
      <section>
        {product.photos.map((photo) => (
          <img key="photo" alt="product photos" src={photo} />
        ))}
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </section>
    </>
  );
};

export default ProductCard;
