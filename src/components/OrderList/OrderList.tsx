import OrderedItem from "./OrderedItem";
import { Order } from "../global.type";

type OrderListProps = {
  orders: Order[] | undefined;
};

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <>
      {orders?.map((order: Order) => {
        return (
          <section key={order.orderNumber} className="order-list">
            <p>Bestellungsnumber:{order.orderNumber}</p>
            <p>Datum:{order.date}</p>
            <OrderedItem oderedItems={order.orderedProducts} />
          </section>
        );
      })}
    </>
  );
};
export default OrderList;
