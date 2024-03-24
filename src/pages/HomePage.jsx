import { useEffect, useState } from "react";
import LoadMoreBtn from "../components/loadMoreBtn/LoadMoreBtn";
import MovieList from "../components/movieList/MovieList";
import { getTrendingMovies } from "../services/api";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      if (page !== undefined) {
        const trendingMovies = await getTrendingMovies(page);
        setMovies((prevMovies) => [...prevMovies, ...trendingMovies]);
      }
    })();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Trending Today</h2>
      {Array.isArray(movies) && movies !== undefined && (
        <MovieList movies={movies} page={page} />
      )}
      <LoadMoreBtn onClick={loadMore} />
    </div>
  );
};

export default HomePage;
