import { Link } from "react-router-dom";
import css from "./SearchResultsList.module.css";

const SearchResultsList = ({ searchResults }) => {
  return (
    <div>
      {searchResults ? (
        <ul className={css.searchList}>
          {searchResults.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default SearchResultsList;
