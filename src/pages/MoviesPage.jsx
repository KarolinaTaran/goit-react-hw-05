import { useEffect, useState } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import SearchResultsList from "../components/searchResultsList/SearchResultsList";
import { getSearchingMovie } from "../services/api";
import MovieList from "../components/movieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
      }
    })();
  }, [searchQuery]);

  const handleSearch = async (query) => {
    try {
      const searchData = await getSearchingMovie(query);
      setMovies(searchData);
      navigate(`/movies?query=${query}`);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const loadMore = async () => {
    try {
      const newData = await getSearchingMovie(searchQuery);
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
    </div>
  );
};
export default MoviesPage;
