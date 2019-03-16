import { BASE_URL_MOVIE, BASE_URL_TV_SHOW } from '../../config/URL';
import * as types from './types';

const LoadSearchMovie = (keyword) => {
  return dispatch => {
    dispatch(loadSearchMovie(true));
    fetch(`${BASE_URL_MOVIE}=${keyword}`)
      .then(result => {
        result.json().then(res => {
          dispatch(loadSearchMovieSuccess(res))
        })
      })
      .catch(error => {
        dispatch(loadSearchMovieFailed(error));
      });
  };
};

const LoadSearchTVShow = (keyword) => {
  return dispatch => {
    dispatch(loadSearchMovie(true));
    fetch(`${BASE_URL_TV_SHOW}=${keyword}`)
      .then(result => {
        result.json().then(res => {
          dispatch(loadSearchMovieSuccess(res))
        })
      })
      .catch(error => {
        dispatch(loadSearchMovieFailed(error));
      });
  };
};

export const LoadSearchMovieChooserAction = (type, keyword) => {
  if (type === 'tv') {
    return LoadSearchTVShow(keyword);
  } else {
    return LoadSearchMovie(keyword);
  }
};

export const ResetSearchMovieAction = () => {
  return dispatch => {dispatch(resetSearchMovie())}
};

export const loadSearchMovie = bool => {
  return {
    type: types.LOAD_SEARCH_MOVIE,
    payload: bool
  };
};

export const loadSearchMovieSuccess = data => {
  return {
    type: types.LOAD_SEARCH_MOVIE_SUCCESS,
    payload: data,
    loading: false
  };
};

export const loadSearchMovieFailed = error => {
  return {
    type: types.LOAD_SEARCH_MOVIE_FAIL,
    payload: error,
    loading: false
  };
};

export const resetSearchMovie = () => {
  return {
    type: types.RESET_SEARCH_MOVIE,
    payload: [],
    loading: false,
  };
;}