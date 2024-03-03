import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';
import { fetchTrendingMovies } from './movieApi';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTrendingMovies();
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.trendingHeader}>Trending Today</h1>
      <ul className={styles.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieItem}>
            <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
