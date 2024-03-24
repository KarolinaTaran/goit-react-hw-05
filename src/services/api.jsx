import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const ACCESS_KEY = "c386a5d859151328539f0be53cca08b2";

export const getTrendingMovies = async (page) => {
  const response = await axios.get(
    `/trending/movie/day?api_key=${ACCESS_KEY}&page=${page}`
  );
  const moviesData = response.data.results;
  return moviesData;
};

export const getSearchingMovie = async (query, page = 1) => {
  const response = await axios.get(
    `/search/movie?api_key=${ACCESS_KEY}&query=${query}&include_adult=false&language=en-US&page=${page}`
  );
  const searchData = response.data.results;
  return searchData;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?api_key=${ACCESS_KEY}`);
  const movieData = response.data;
  return movieData;
};

export const getMovieCredits = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/credits?api_key=${ACCESS_KEY}`
  );
  const castData = response.data.cast;
  return castData;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?api_key=${ACCESS_KEY}`
  );
  const reviewsData = response.data.results;
  return reviewsData;
};
