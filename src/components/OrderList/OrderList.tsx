import OrderedItem from "./OrderedItem";
import { Order } from "../../types/global.type";

type OrderListProps = {
  orders: Order[] | null;
  onCancelOrder: (orderNumber: string) => void;
};

const OrderList = ({ orders, onCancelOrder }: OrderListProps) => {
  if (orders)
    return (
      <>
        {orders.map((order: Order) => (
          <OrderedItem
            key={order.orderNumber}
            order={order}
            onCancelOrder={onCancelOrder}
          />
        ))}
      </>
    );
};
export default OrderList;
