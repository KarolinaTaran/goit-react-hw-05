import { useEffect, useState } from "react";
import MovieCast from "../components/movieCast/MovieCast";
import MovieReviews from "../components/movieReviews/MovieReviews";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const MovieDetailsPage = () => {
  const [currentMovie, setCurrentMovie] = useState(null);
  const { movieId } = useParams();
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const ACCESS_KEY = "c386a5d859151328539f0be53cca08b2";
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${ACCESS_KEY}`;
    axios
      .get(url)
      .then((response) => {
        const movieData = response.data;
        setCurrentMovie(movieData);
      })
      .catch((err) => console.error(err));
  }, [movieId]);

  if (!currentMovie) return <div>Loading...</div>;

  const toggleCast = () => {
    setShowCast(!showCast);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div>
      <h2>{currentMovie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
        alt={currentMovie.title}
        width={400}
      />
      <p>Popularity: {currentMovie.popularity.toFixed(1)}</p>
      <p>Release Date: {currentMovie.release_date}</p>
      <p>Overview: {currentMovie.overview}</p>
      <div>
        <Link to={`/movies/${currentMovie.id}/cast`}>
          <h3 onClick={toggleCast} style={{ cursor: "pointer" }}>
            Cast
          </h3>
          {showCast && (
            <MovieCast
              style={{ cursor: "pointer" }}
              movieId={currentMovie.id}
            />
          )}
        </Link>

        <Link to={`/movies/${currentMovie.id}/reviews`}>
          <h3 onClick={toggleReviews} style={{ cursor: "pointer" }}>
            Reviews
          </h3>
          {showReviews && <MovieReviews movieId={currentMovie.id} />}
        </Link>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
