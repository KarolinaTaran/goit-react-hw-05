import { useEffect, useState } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getSearchingMovie } from "../services/api";
import MovieList from "../components/movieList/MovieList";
import LoadMoreBtn from "../components/loadMoreBtn/LoadMoreBtn";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams);
  const navigate = useNavigate();
  const location = useLocation();

  const { query, page } = searchParams;

  useEffect(
    (page) => {
      const inputSearch = searchParams.get("query");
      if (inputSearch) {
        handleSearch(inputSearch, 1);
        setSearchQuery(inputSearch);
        setCurrentPage(parseInt(page) || 1);
      } else {
        setMovies([]);
      }
    },
    [query, page]
  );

  const handleSearch = async (query, page) => {
    try {
      const nextPage = parseInt(page) || 1;
      const searchData = await getSearchingMovie(query, nextPage);
      setMovies(searchData);
      navigate(`/movies?query=${query}&page=${nextPage}`, {
        state: location.state,
      });
      setCurrentPage(nextPage + 1);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const loadMore = async () => {
    try {
      const query = searchParams.get("query");
      let nextPage = parseInt(currentPage) || 1;
      const newData = await getSearchingMovie(query, nextPage);
      setMovies((prevResults) => [...prevResults, ...newData]);
      setCurrentPage((nextPage) => nextPage + 1);
    } catch (error) {
      console.error("Error loading more movies:", error);
    }
  };

  return (
    <div>
      <h2>
        {searchQuery && searchQuery.length > 0
          ? `Search results for ${searchQuery}`
          : "Discover Movies"}
      </h2>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} state={location.state} onLoadMore={loadMore} />
      {movies.length > 0 && <LoadMoreBtn onClick={loadMore} />}
    </div>
  );
};
export default MoviesPage;
