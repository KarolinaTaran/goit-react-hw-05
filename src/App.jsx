import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/loader/Loader";
import * as styles from "./App.modules.css";
import SearchResultsList from "./components/searchResultsList/SearchResultsList";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const MovieCast = lazy(() => import("./components/movieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/movieReviews/MovieReviews")
);
const Navigation = lazy(() => import("./components/navigation/Navigation"));

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
          <Route
            path="/movies/search"
            element={<SearchResultsList />}
            className={getNavLinkClassNames}
          />
          <Route
            path="/movies/:movieId"
            element={<MovieDetailsPage />}
            className={getNavLinkClassNames}
          >
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
            <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
