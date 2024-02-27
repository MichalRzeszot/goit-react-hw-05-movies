import { NavLink, Outlet, useParams } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import css from './moviedetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=492aa469db167d08ffbb05ac7fdafe78`;
  const { data, isLoading, error } = useFetch(url);

  return (
    <div className={css.container}>
      {error && <div className={css.error}>{error.message}</div>}
      {isLoading && <div className={css.loading}>Loading...</div>}
      {data && (
        <div className={css.movieDetails}>
          <h1 className={css.movieTitle}>{data.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt=""
            className={css.movieImage}
          />
          <p className={css.movieOverview}>{data.overview}</p>
        </div>
      )}
      <NavLink to="reviews" className={css.button}>
        Reviews
      </NavLink>
      <NavLink to="cast" className={css.button}>
        Cast
      </NavLink>
      <Outlet />
    </div>
  );
};
export default MovieDetails;
