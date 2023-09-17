import styled from "styled-components";
import OrderedItem from "./OrderedItem";
import { Order } from "../../types/global.type";

type OrderListProps = {
  orders: Order[] | undefined;
};

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <>
      {orders?.map((order: Order) => {
        return (
          <CardContainer key={order.orderNumber}>
            <h4>Bestellungsnumber:</h4>
            <p>{order.orderNumber}</p>
            <p>
              <strong>Datum:</strong> {order.date}
            </p>
            <OrderedItem oderedItems={order.orderedProducts} />
          </CardContainer>
        );
      })}
    </>
  );
};
export default OrderList;

const CardContainer = styled.div`
  margin: 1em 3%;
  padding: 0.3em 0 1em 0;
  width: 94%;
  background-color: white;
  border-radius: 1em;

  display: flex;
  flex-direction: column;
`;
