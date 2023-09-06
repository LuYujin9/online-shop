import { FiStar } from "react-icons/fi";

type BookmarkButtonProps = {
  isFavorite: boolean;
  toggleFavorite: () => void;
};

const BookmarkButton = ({
  isFavorite,
  toggleFavorite,
}: BookmarkButtonProps) => {
  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={isFavorite ? "aktive-favorite-button" : "favorite-button"}
    >
      <FiStar />
    </button>
  );
};

export default BookmarkButton;
