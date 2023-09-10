import styled from "styled-components";
import { FiStar } from "react-icons/fi";

type BookmarkButtonProps = {
  isFavorite: boolean;
  toggleFavorite: () => void;
};

const BookmarkButton = ({
  isFavorite,
  toggleFavorite,
}: BookmarkButtonProps) => {
  const iconStyles = { color: `var(--color-05)`, fontSize: "1.6em" };
  const buttonColor = isFavorite ? "var(--color-04)" : "white";
  return (
    <StyledButton type="button" onClick={toggleFavorite} color={buttonColor}>
      <FiStar style={iconStyles} />
    </StyledButton>
  );
};

export default BookmarkButton;

const StyledButton = styled.button`
  width: 2.5em;
  height: 2.5em;
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 1.5em;

  position: relative;
  left: 65%;
  bottom: 5em;

  @media screen and (min-width: 600px) {
    left: 50%;
  }
`;
