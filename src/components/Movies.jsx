import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMoviesByQuery } from './movieApi';
import css from './Movies.module.css';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetchMoviesByQuery(query);
      setMovies(response.data.results);
    } catch (error) {
      setError(error);
      console.error('Error fetching movies:', error);
    }
    setQuery('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search movies"
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
      {error && <div className={css.errorMessage}>Error: {error.message}</div>}
      <ul className={css.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={css.movieItem}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
