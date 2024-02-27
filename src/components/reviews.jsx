import { useParams } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import styles from './reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=492aa469db167d08ffbb05ac7fdafe78`;
  const { data, isLoading, error } = useFetch(url);

  return (
    <div className={styles.reviewsContainer}>
      {error && <div className={styles.error}>{error.message}</div>}
      {isLoading && <div className={styles.loading}>Loading...</div>}
      {data && data.results.length > 0 ? (
        <ul className={styles.reviewsList}>
          {data.results.map(review => (
            <li key={review.id} className={styles.reviewItem}>
              <h3 className={styles.author}>{review.author}</h3>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noReviews}>No reviews yet</div>
      )}
    </div>
  );
};

export default Reviews;
