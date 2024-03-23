import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const imgDefault = (
    <img src={`/img/picDefault.png`} width={100} height={150} alt="poster" />
  );

  useEffect(() => {
    const ACCESS_KEY = "c386a5d859151328539f0be53cca08b2";
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${ACCESS_KEY}`;

    axios
      .get(url)
      .then((response) => {
        const castData = response.data.cast;
        setCast(castData);
      })
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div className={css.castWrapper}>
      {cast.map((actor) => (
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
      ))}
    </div>
  );
};

export default MovieCast;
