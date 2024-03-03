import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMoviesByQuery } from './movieApi';
import css from './searchbar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchMoviesByQuery(query);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
  };

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h1>Search Bar</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          Submit
        </button>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className={css.input}
          placeholder="Search for movies..."
        />
      </form>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      <ul className={css.resultsList}>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              {movie.title} (
              {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
