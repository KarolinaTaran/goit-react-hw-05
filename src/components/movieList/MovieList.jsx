import axios from "axios";
import { useEffect, useState } from "react";
import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const ACCESS_KEY = "c386a5d859151328539f0be53cca08b2";
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${ACCESS_KEY}&page=1&per_page=10`;

    axios
      .get(url)
      .then((response) => {
        const moviesData = response.data.results;
        setMovies(moviesData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className={css.heading}>Trending Today</h2>
      <ul className={css.movieList}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>Popularity: {movie.popularity.toFixed(1)}</p>
            <Link state={location} to={`/movies/${movie.id}`}>
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
