import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './reviews.module.css';
import { fetchMovieReviews } from './movieApi';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchMovieReviews(movieId);
        setReviews(response.data.results);
      } catch (error) {
        setError(error);
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div className={styles.reviewsContainer}>
      {error && <div className={styles.error}>{error.message}</div>}
      {isLoading && <div className={styles.loading}>Loading...</div>}
      {reviews && reviews.length > 0 ? (
        <ul className={styles.reviewsList}>
          {reviews.map(review => (
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
