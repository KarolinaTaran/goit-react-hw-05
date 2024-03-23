import css from "./MovieList.module.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const MovieList = ({ movies }) => {
  const posterDefault = (
    <img src={`/img/posterDefault.jpg`} width={200} height={300} alt="poster" />
  );
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  return (
    <div>
      <ul className={css.movieList}>
        {movies.map((movie, index) => (
          <li className={css.item} key={`${movie.id}_${index}`}>
            <h3>{movie.title}</h3>
            <p>Popularity: {movie.popularity.toFixed(1)}</p>
            <Link to={`/movies/${movie.id}`} state={location}>
              {movie.poster_path !== null ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                />
              ) : (
                posterDefault
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
