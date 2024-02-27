import { useState } from 'react';
import useFetch from './hooks/useFetch';
import { Link } from 'react-router-dom';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/search/movie?api_key=492aa469db167d08ffbb05ac7fdafe78&query=${search}`
  );

  const handleSubmit = event => {
    event.preventDefault();
    setSearch(query);
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
        />
      </form>
      {error && <div>{error}</div>}

      {loading && <div>Loading...</div>}
      {data && (
        <ul className={css.resultsList}>
          {data.results.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                {movie.title} ({movie.release_date.split('-')[0]})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
