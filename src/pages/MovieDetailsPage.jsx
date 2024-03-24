import { useEffect, useRef, useState } from "react";
import MovieCast from "../components/movieCast/MovieCast";
import MovieReviews from "../components/movieReviews/MovieReviews";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Loader from "../components/loader/Loader";
import { getMovieDetails } from "../services/api";

const MovieDetailsPage = () => {
  const posterDefault = (
    <img src={`/img/posterDefault.jpg`} width={600} height={400} alt="poster" />
  );

  const [currentMovie, setCurrentMovie] = useState(null);
  const { movieId } = useParams();
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const location = useLocation();
  const backHref = useRef(location.state || "/movies");

  useEffect(() => {
    (async () => {
      if (movieId !== undefined) {
        const movieData = await getMovieDetails(movieId);
        setCurrentMovie(movieData);
      }
    })();
  }, []);

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
        <NavLink onClick={toggleCast}>
          <h3 style={{ cursor: "pointer" }}>Cast</h3>
          {showCast && <MovieCast style={{ cursor: "pointer" }} />}
        </NavLink>

        <NavLink onClick={toggleReviews}>
          <h3 style={{ cursor: "pointer" }}>Reviews</h3>
          {showReviews && <MovieReviews movieId={currentMovie.id} />}
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
