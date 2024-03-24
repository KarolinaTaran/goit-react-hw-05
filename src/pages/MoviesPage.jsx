import { useEffect, useRef, useState } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getSearchingMovie } from "../services/api";
import MovieList from "../components/movieList/MovieList";
import LoadMoreBtn from "../components/loadMoreBtn/LoadMoreBtn";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query"));
  const navigate = useNavigate();
  const location = useLocation();
  const lastQuery = useRef("");

  const { query, page } = searchParams;

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      setCurrentPage(parseInt(page) || 1);
    } else {
      setMovies([]);
    }
  }, [query, page]);

  const handleSearch = async (query, page) => {
    try {
      const nextPage = parseInt(page) || 1;
      const searchData = await getSearchingMovie(query, nextPage);
      setMovies(searchData);
      navigate(`/movies?query=${query}&page=${nextPage}`, {
        state: location.state,
      });
      lastQuery.current = query;
      setCurrentPage(nextPage + 1);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const loadMore = async () => {
    try {
      const newData = await getSearchingMovie(
        lastQuery.current,
        currentPage + 1
      );
      setMovies((prevResults) => [...prevResults, ...newData]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading more movies:", error);
    }
  };

  return (
    <div>
      <h2>
        {searchQuery
          ? `Search results for "${searchQuery}"`
          : "Discover Movies"}
      </h2>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} state={location.state} onLoadMore={loadMore} />
      {movies.length > 0 && <LoadMoreBtn onClick={loadMore} />}
    </div>
  );
};
export default MoviesPage;
