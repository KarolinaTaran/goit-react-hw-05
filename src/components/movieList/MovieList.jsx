import css from "./MovieList.module.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  return (
    <div>
      <h2 className={css.heading}>Trending Today</h2>
      <ul className={css.movieList}>
        {movies.map((movie, index) => (
          <li className={css.item} key={`${movie.id}_${index}`}>
            <h3>{movie.title}</h3>
            <p>Popularity: {movie.popularity.toFixed(1)}</p>
            <Link to={`/movies/${movie.id}`} state={location}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
