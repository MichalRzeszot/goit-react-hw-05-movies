import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import css from './moviedetails.module.css';
import { fetchMovieDetails } from './movieApi';

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMovieDetails(movieId);
        setMovieDetails(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div className={css.container}>
      {error && <div className={css.error}>{error.message}</div>}
      {isLoading && <div className={css.loading}>Loading...</div>}
      {!isLoading && movieDetails && (
        <div className={css.movieDetails}>
          <button onClick={() => navigate(-1)} className={css.button}>
            Go back
          </button>
          <h1 className={css.movieTitle}>{movieDetails.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className={css.movieImage}
          />
          <p className={css.movieOverview}>{movieDetails.overview}</p>
          <NavLink to="reviews" className={css.button}>
            Reviews
          </NavLink>
          <NavLink to="cast" className={css.button}>
            Cast
          </NavLink>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
