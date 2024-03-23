import { useEffect, useState } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getSearchingMovie } from "../services/api";
import MovieList from "../components/movieList/MovieList";
import LoadMoreBtn from "../components/loadMoreBtn/LoadMoreBtn";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { query } = searchParams;

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    } else {
      setMovies([]);
    }
  }, [query]);

  useEffect(() => {
    (async () => {
      if (query !== undefined) {
        const searchResults = await getSearchingMovie(query);
        setMovies(searchResults);
        setLastQuery(query);
      }
    })();
  }, [searchQuery]);

  const handleSearch = async (query) => {
    try {
      const searchData = await getSearchingMovie(query);
      setMovies(searchData);
      navigate(`/movies?query=${query}`);
      setLastQuery(query);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const loadMore = async () => {
    try {
      const newData = await getSearchingMovie(lastQuery);
      setMovies((prevResults) => [...prevResults, ...newData]);
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
