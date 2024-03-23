import { useEffect, useState } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchResultsList from "../components/searchResultsList/SearchResultsList";
import { getSearchingMovie } from "../services/api";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
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
      setSearchResults([]);
    }
  }, [query]);

  useEffect(() => {
    (async () => {
      if (query !== undefined) {
        const searchResults = await getSearchingMovie(query);
        setSearchResults(searchResults);
      }
    })();
  }, [searchQuery]);

  const handleSearch = async (query) => {
    try {
      const searchData = await getSearchingMovie(query);
      setSearchResults(searchData);
      navigate(`/movies?query=${query}`);
    } catch (error) {
      console.error("Error searching movies:", error);
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
      <SearchResultsList searchResults={searchResults} state={location.state} />
    </div>
  );
};
export default MoviesPage;
