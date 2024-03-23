import { useEffect, useState } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchResultsList from "../components/searchResultsList/SearchResultsList";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { query } = searchParams;

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleSearch = (query) => {
    const ACCESS_KEY = "c386a5d859151328539f0be53cca08b2";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${ACCESS_KEY}&query=${query}&include_adult=false&language=en-US&page=1`;

    axios
      .get(url)
      .then((response) => {
        const searchData = response.data.results;
        setSearchResults(searchData);
        navigate(`/movies?query=${query}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>
        {searchQuery
          ? `Search results for "${searchQuery}"`
          : "Discover Movies"}
      </h2>
      <SearchBar onSearch={handleSearch} />
      <SearchResultsList searchResults={searchResults} />
    </div>
  );
};
export default MoviesPage;
