import { useEffect, useState } from "react";
import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    (async () => {
      if (movieId !== undefined) {
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      }
    })();
  }, [movieId]);

  return (
    <div>
      {reviews !== undefined && reviews.length > 0 ? (
        <ul className={css.reviewsList}>
          {reviews.map((review, index) => (
            <li className={css.item} key={index}>
              <p className={css.nameAuthor}>Author: {review.author}</p>
              <p className={css.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        "Sorry, there are no reviews to show"
      )}
    </div>
  );
};

export default MovieReviews;
