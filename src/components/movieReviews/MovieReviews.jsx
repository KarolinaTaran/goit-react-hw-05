import css from "./MovieReviews.module.css";

const MovieReviews = ({ reviews }) => {
  return (
    <div>
      <ul className={css.reviewsList}>
        {reviews !== undefined &&
          reviews.map((review, index) => (
            <li className={css.item} key={index}>
              <p className={css.nameAuthor}>Author: {review.author}</p>
              <p className={css.text}>{review.content}</p>
            </li>
          ))}
      </ul>
      : ( "Sorry, there are no any reviews." )
    </div>
  );
};

export default MovieReviews;
