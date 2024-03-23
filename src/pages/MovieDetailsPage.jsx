import { useEffect, useRef, useState } from "react";
import MovieCast from "../components/movieCast/MovieCast";
import MovieReviews from "../components/movieReviews/MovieReviews";
import { Link, useLocation, useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieReviews,
} from "../services/api";

const MovieDetailsPage = () => {
  const posterDefault = (
    <img src={`/img/posterDefault.jpg`} width={600} height={400} alt="poster" />
  );

  const [reviews, setReviews] = useState([]);
  const [cast, setCast] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const { movieId } = useParams();
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const location = useLocation();
  const backHref = useRef(location.state || "/movies/search");

  useEffect(() => {
    (async () => {
      if (movieId !== undefined) {
        const movieData = await getMovieDetails(movieId);
        setCurrentMovie(movieData);
      }
    })();
  }, [movieId]);

  useEffect(() => {
    (async () => {
      if (movieId !== undefined) {
        const castData = await getMovieCredits(movieId);
        setCast(castData);
      }
    })();
  }, [movieId]);

  useEffect(() => {
    (async () => {
      if (movieId !== undefined) {
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      }
    })();
  }, [movieId]);

  if (!currentMovie) return <Loader />;

  const toggleCast = () => {
    setShowCast(!showCast);
    setShowReviews(false);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
    setShowCast(false);
  };

  return (
    <div>
      <Link
        to={backHref.current}
        style={{
          display: "flex",
          marginLeft: "40px",
          textDecorationLine: "underline",
        }}
      >
        ↩Go back
      </Link>
      <h2>{currentMovie.title}</h2>
      {currentMovie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
          alt={currentMovie.title}
          width={400}
        />
      ) : (
        posterDefault
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "justify",
        }}
      >
        <p>Popularity: {currentMovie.popularity.toFixed(1)}</p>
        <p>Release Date: {currentMovie.release_date}</p>
        <p>Overview: {currentMovie.overview}</p>
      </div>
      <div>
        <Link to={`/movies/${currentMovie.id}/cast`}>
          <h3 onClick={toggleCast} style={{ cursor: "pointer" }}>
            Cast
          </h3>
          {showCast && (
            <MovieCast
              style={{ cursor: "pointer" }}
              movieId={movieId}
              cast={cast}
            />
          )}
        </Link>

        <Link to={`/movies/${currentMovie.id}/reviews`}>
          <h3 onClick={toggleReviews} style={{ cursor: "pointer" }}>
            Reviews
          </h3>
          {showReviews && (
            <MovieReviews movieId={currentMovie.id} reviews={reviews} />
          )}
        </Link>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
