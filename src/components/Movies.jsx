import React, { useState } from 'react';
import axios from 'axios';
import styles from './Movies.module.css';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=492aa469db167d08ffbb05ac7fdafe78&query=${query}`
      )
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => console.log(error));
    setQuery('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search movies"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      <ul className={styles.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieItem}>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
