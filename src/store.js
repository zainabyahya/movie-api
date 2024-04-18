import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk"; // Import thunk correctly
// now playing https://api.themoviedb.org/3/movie/now_playing
// Popular https://api.themoviedb.org/3/movie/popular\
// Top Rated https://api.themoviedb.org/3/movie/top_rated
// Upcoming https://api.themoviedb.org/3/movie/upcoming
const initialState = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  upComing: [],
  movieDetails: {},
  movieCast: [],
  castDetails: {},
  director: {},
  trailer: "",
  bookmark: [],

};
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "51b15414097474cf95e6f8917f62ca5e";

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case "nowPlaying/fetch":
      return { ...state, nowPlaying: action.payload };
    case "popular/fetch":
      return { ...state, popular: action.payload };
    case "topRated/fetch":
      return { ...state, topRated: action.payload };
    case "upComing/fetch":
      return { ...state, upComing: action.payload };
    case "details/fetch":
      return { ...state, movieDetails: action.payload };
    case "cast/fetch":
      return { ...state, movieCast: action.payload };
    case "castDetails/fetch":
      return { ...state, castDetails: action.payload };
    case "director/fetch":
      return { ...state, director: action.payload };
    case "trailer/fetch":
      return { ...state, trailer: action.payload };
    case "bookmark/add":
      return { ...state, bookmark: [...state.bookmark, action.payload] };
    case "bookmark/remove":
      return {
        ...state,
        bookmark: state.bookmark.filter((movie) => movie.id !== action.payload),
      };
    default:
      break;
  }

  return state;
}
const store = createStore(moviesReducer, applyMiddleware(thunk));

export function addBookmark(movie) {
  return (dispatch, getState) => {
    const { bookmark } = getState();
    const isAlreadyBookmarked = bookmark.some((bookmarkMovie) => bookmarkMovie.id === movie.id);

    if (!isAlreadyBookmarked) {
      dispatch({ type: "bookmark/add", payload: movie });
    }
  };
}

export function removeBookmark(movieId) {
  return { type: "bookmark/remove", payload: movieId };
}

export function getTrailer(id) {
  return async (dispatch) => {
    try {
      const res = await fetch(`${BASE_URL}movie/${id}/videos?api_key=${API_KEY}`);
      const data = await res.json();
      const trailer = "https://www.youtube.com/embed/" + data.results[0].key;
      dispatch({ type: "trailer/fetch", payload: trailer });
    } catch (error) {
      console.error("Error fetching director:", error);
    }
  };
}

export function getDirector(id) {
  return async (dispatch) => {
    try {
      const res = await fetch(`${BASE_URL}movie/${id}/credits?api_key=${API_KEY}`);
      const data = await res.json();
      const director = data.crew.filter(({ job }) => job === 'Director');
      dispatch({ type: "director/fetch", payload: director });
    } catch (error) {
      console.error("Error fetching director:", error);
    }
  };
}

export function getCastDetails(id) {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${BASE_URL}person/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      dispatch({ type: "castDetails/fetch", payload: data });
    } catch (error) {
      console.error("Error fetching movieCast:", error);
    }
  };
}

export function getMovieCast(id) {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}`);
      const data = await res.json();
      dispatch({ type: "cast/fetch", payload: data.cast });
    } catch (error) {
      console.error("Error fetching movieCast:", error);
    }
  };
}
export function getMovieDetails(id) {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${BASE_URL}movie/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      dispatch({ type: "details/fetch", payload: data });
    } catch (error) {
      console.error("Error fetching movieDetails:", error);
    }
  };
}

export function getNowPlaying() {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${BASE_URL}movie/now_playing?api_key=${API_KEY}`
      );
      const data = await res.json();
      dispatch({ type: "nowPlaying/fetch", payload: data.results });
    } catch (error) {
      console.error("Error fetching nowPlaying:", error);
    }
  };
}
export function getPopular() {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${BASE_URL}movie/popular?api_key=${API_KEY}`
      );
      const data = await res.json();
      dispatch({ type: "popular/fetch", payload: data.results });
    } catch (error) {
      console.error("Error fetching popular:", error);
    }
  };
}
export function getTopRated() {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${BASE_URL}movie/top_rated?api_key=${API_KEY}`
      );
      const data = await res.json();
      dispatch({ type: "topRated/fetch", payload: data.results });
    } catch (error) {
      console.error("Error fetching topRated:", error);
    }
  };
}
export function getUpComing() {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${BASE_URL}movie/upcoming?api_key=${API_KEY}`
      );
      const data = await res.json();
      dispatch({ type: "upComing/fetch", payload: data.results });
    } catch (error) {
      console.error("Error fetching upComing:", error);
    }
  };
}
export default store;
