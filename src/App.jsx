import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/loader/Loader";
import * as styles from "./App.modules.css";
import Navigation from "./components/navigation/Navigation";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const MovieCast = lazy(() => import("./components/movieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/movieReviews/MovieReviews")
);

const getNavLinkClassNames = ({ isActive }) =>
  clsx({
    [styles.active]: isActive,
  });

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
            className={getNavLinkClassNames}
          />
          <Route
            path="/movies"
            element={<MoviesPage />}
            className={getNavLinkClassNames}
          />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
