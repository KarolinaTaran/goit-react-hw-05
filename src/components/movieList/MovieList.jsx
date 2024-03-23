import axios from "axios";
import { useEffect, useState } from "react";
import css from "./MovieList.module.css";
import { Link } from "react-router-dom";

const MovieList = ({ page, query }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const ACCESS_KEY = "c386a5d859151328539f0be53cca08b2";
        const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${ACCESS_KEY}&page=${page}`;
        const response = await axios.get(url);
        const moviesData = response.data.results;
        setMovies((prevMovies) => [...prevMovies, ...moviesData]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div>
      <h2 className={css.heading}>Trending Today</h2>
      <ul className={css.movieList}>
        {movies.map((movie, index) => (
          <li className={css.item} key={`${movie.id}_${index}`}>
            <h3>{movie.title}</h3>
            <p>Popularity: {movie.popularity.toFixed(1)}</p>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: `/movies?query=${query}` }}
            >
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
