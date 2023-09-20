import styled from "styled-components";
import { Order } from "../../types/global.type";

type OrderedItemProps = {
  order: Order;
  onCancelOrder: (orderNumber: string) => void;
};

const OrderedItem = ({ order, onCancelOrder }: OrderedItemProps) => {
  return (
    <CardContainer>
      <h4>Bestellungsnumber:</h4>
      <p>{order.orderNumber}</p>
      <p>
        <strong>Datum:</strong> {order.date}
      </p>
      {order.orderedProducts?.map((product) => {
        return (
          <ItemsContainer key={product.productId}>
            <StyledImg
              src={product.photo}
              alt="a photo of ordered product"
              className="product-photo"
            />
            <StyledH4>{product.productName}</StyledH4>
            <StyledParagraph>Menge: {product.quantity}</StyledParagraph>
          </ItemsContainer>
        );
      })}
      <h4>Gesamtpreis:{order.totalPrice.toFixed(2)} €</h4>
      <StyledButton onClick={() => onCancelOrder(order.orderNumber)}>
        Stonieren
      </StyledButton>
    </CardContainer>
  );
};
export default OrderedItem;

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

const ItemsContainer = styled.div`
  margin: 0 3%;
  padding: 0.5em 0;
  height: 6em;
  border-top: 1px solid var(--color-04);
  border-bottom: 1px solid var(--color-04);
  background-color: white;

  display: grid;
  grid-template-columns: 8em 60%;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "a b "
    "a c ";
`;

const StyledImg = styled.img`
  width: 6em;
  height: 100%;
  grid-area: a;
`;

const StyledH4 = styled.h4`
  grid-area: b;
`;
const StyledParagraph = styled.p`
  grid-area: c;
`;
