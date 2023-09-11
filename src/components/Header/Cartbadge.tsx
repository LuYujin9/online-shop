import styled from "styled-components";
type CartBadgeProps = {
  itemCount: number;
};

const CartBadge = ({ itemCount }: CartBadgeProps) => {
  return (
    <div>
      {itemCount > 0 && <Badge>{itemCount > 99 ? "99+" : itemCount}</Badge>}
    </div>
  );
};
export default CartBadge;

const Badge = styled.div`
  width: 1em;
  height: 1em;
  border-radius: 0.5em;
  font-size: 15px;
  color: white;
  background-color: red;
  text-align: center;

  position: relative;
  right: 5px;
  top: 10px;
`;
