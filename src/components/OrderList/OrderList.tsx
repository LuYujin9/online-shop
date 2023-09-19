import styled from "styled-components";
import OrderedItem from "./OrderedItem";
import { Order } from "../../types/global.type";

type OrderListProps = {
  orders: Order[] | undefined;
  onCancelOrder: (orderNumber: string) => void;
};

const OrderList = ({ orders, onCancelOrder }: OrderListProps) => {
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
            <h4>Gesamtpreis:{order.totalPrice.toFixed(2)} €</h4>
            <StyledButton onClick={() => onCancelOrder(order.orderNumber)}>
              Stonieren
            </StyledButton>
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

const StyledButton = styled.button`
  margin: 1em auto;
  width: 10em;
  height: 2em;
  border: none;
  border-radius: 0.5em;
  color: white;
  background-color: var(--color-03);
  font-weight: bold;
  box-shadow: 1px 1px 1px 1px var(--color-04);
`;
