import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const ACCESS_KEY = "c386a5d859151328539f0be53cca08b2";
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${ACCESS_KEY}`;

    axios
      .get(url)
      .then((response) => {
        const reviewsData = response.data.results;
        setReviews(reviewsData);
      })
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className={css.reviewsList}>
          {reviews.map((review, index) => (
            <li className={css.item} key={index}>
              <p className={css.nameAuthor}>Author: {review.author}</p>
              <p className={css.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        "Sorry, there are no any reviews."
      )}
    </div>
  );
};

export default MovieReviews;
