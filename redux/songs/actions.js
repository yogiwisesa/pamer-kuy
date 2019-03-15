import { BASE_URL_SONG } from '../../config/URL';
import * as types from './types';

const SEARCH_ENDPOINT = `${BASE_URL_SONG}&method=track.search&track`;

export const LoadSearchSongAction = keyword => {
  return dispatch => {
    dispatch(loadSearchSong(true));
    fetch(`${SEARCH_ENDPOINT}=${keyword}`)
      .then(result => {
        result.json().then(res => {
          dispatch(loadSearchSongSuccess(res))
        })
      })
      .catch(error => {
        dispatch(loadSearchSongFailed(error));
      });
  };
};

export const loadSearchSong = bool => {
  return {
    type: types.LOAD_SEARCH_SONG,
    payload: bool
  };
};

export const loadSearchSongSuccess = data => {
  return {
    type: types.LOAD_SEARCH_SONG_SUCCESS,
    payload: data,
    loading: false
  };
};

export const loadSearchSongFailed = error => {
  return {
    type: types.LOAD_SEARCH_SONG_FAIL,
    payload: error,
    loading: false
  };
};
