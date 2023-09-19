import styled from "styled-components";
import { itemInfo } from "../../types/global.type";

type OrderedItemProps = {
  oderedItems: itemInfo[] | null;
};

const OrderedItem = ({ oderedItems }: OrderedItemProps) => {
  return (
    <>
      {oderedItems?.map((item) => {
        return (
          <ItemsContainer key={item.productId}>
            <StyledImg
              src={item.photo}
              alt="a photo of ordered product"
              className="product-photo"
            />
            <StyledH4>Name: {item.productName}</StyledH4>
            <StyledParagraph>Menge: {item.quantity}</StyledParagraph>
          </ItemsContainer>
        );
      })}
    </>
  );
};
export default OrderedItem;

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
