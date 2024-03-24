import { useEffect, useState } from "react";
import { getMovieCredits } from "../../services/api";
import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const imgDefault = (
    <img src={`/img/picDefault.png`} width={100} height={150} alt="poster" />
  );
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    (async () => {
      if (movieId !== undefined) {
        const castData = await getMovieCredits(movieId);
        setCast(castData);
      }
    })();
  }, [movieId]);

  return (
    <div className={css.castWrapper}>
      {cast !== undefined && cast.length > 0
        ? cast.map((actor) => (
            <ul key={actor.id}>
              <li className={css.castList}>{actor.name}</li>
              <li className={css.castList}>Character: {actor.character}</li>
              <li className={css.castList}>
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    width={100}
                  />
                ) : (
                  imgDefault
                )}
              </li>
            </ul>
          ))
        : "Sorry, there is no cast to show"}
    </div>
  );
};

export default MovieCast;
