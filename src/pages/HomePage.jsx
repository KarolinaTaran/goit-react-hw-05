import { useState } from "react";
import LoadMoreBtn from "../components/loadMoreBtn/LoadMoreBtn";
import MovieList from "../components/movieList/MovieList";

const HomePage = () => {
  const [page, setPage] = useState(1);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <MovieList page={page} />
      <LoadMoreBtn onClick={loadMore} />
    </div>
  );
};

export default HomePage;
