import { itemInfo } from "../global.type";

type OrderedItemProps = {
  oderedItems: itemInfo[] | undefined;
};

const OrderedItem = ({ oderedItems }: OrderedItemProps) => {
  return (
    <>
      {oderedItems?.map((item) => {
        return (
          <div key={item.productId}>
            <p>Name:{item.productName}</p>
            <img
              src={item.photo}
              alt="a photo of ordered product"
              className="product-photo"
            />
            <p>Menge:{item.quantity}</p>
          </div>
        );
      })}
    </>
  );
};
export default OrderedItem;
