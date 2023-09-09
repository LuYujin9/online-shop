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
  return (
    <StyledButton
      type="button"
      onClick={toggleFavorite}
      isFavorite={isFavorite}
    >
      <FiStar style={iconStyles} />
    </StyledButton>
  );
};

export default BookmarkButton;

const StyledButton = styled.button<{ isFavorite: boolean }>`
  width: 2.5em;
  height: 2.5em;
  background-color: ${(props) =>
    props.isFavorite ? "var(--color-04)" : "white"};
  border: none;
  border-radius: 1.5em;

  position: relative;
  left: 65%;
  bottom: 5em;
`;
