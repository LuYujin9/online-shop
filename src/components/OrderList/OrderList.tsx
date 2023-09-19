import OrderedItem from "./OrderedItem";
import { Order } from "../../types/global.type";

type OrderListProps = {
  orders: Order[] | null;
  onCancelOrder: (orderNumber: string) => void;
};

const OrderList = ({ orders, onCancelOrder }: OrderListProps) => {
  return (
    <>
      {orders?.map((order: Order) => (
        <OrderedItem order={order} onCancelOrder={onCancelOrder} />
      ))}
    </>
  );
};
export default OrderList;
