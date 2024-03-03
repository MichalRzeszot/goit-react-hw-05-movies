import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
  api_key: '492aa469db167d08ffbb05ac7fdafe78',
};

export const fetchTrendingMovies = () => {
  return axios.get('/trending/movie/day');
};

export const fetchMovieDetails = movieId => {
  return axios.get(`/movie/${movieId}`);
};

export const fetchMovieCast = movieId => {
  return axios.get(`/movie/${movieId}/credits`);
};

export const fetchMovieReviews = movieId => {
  return axios.get(`/movie/${movieId}/reviews`);
};

export const fetchMoviesByQuery = query => {
  return axios.get(`/search/movie`, { params: { query } });
};
