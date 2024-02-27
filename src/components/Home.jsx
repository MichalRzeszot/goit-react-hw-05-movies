import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=492aa469db167d08ffbb05ac7fdafe78'
      )
      .then(response => setMovies(response.data.results))
      .catch(error => console.log(error));
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
