import { Order } from "./global.type";

type OrderListProps = {
  orders: Order[] | undefined;
};

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <>
      {orders?.map((order: Order) => {
        return (
          <section key={order.id} className="order-list">
            <p>Bestellungsnumber:{order.id}</p>
            <p>
              <strong>{order.productName}</strong>
            </p>
            <p>Datum:{order.date}</p>
            <p>Menge:{order.quantity}</p>
          </section>
        );
      })}
    </>
  );
};
export default OrderList;
