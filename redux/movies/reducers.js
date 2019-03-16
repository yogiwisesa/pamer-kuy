import * as types from './types';

const initialState = {
  data: [],
  loading: false,
  errorMessage: ''
};

//Define your reducer that will return the initialState by default
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_SEARCH_MOVIE:
      return {
        ...state,
        data: [],
        loading: action.payload
      };
    case types.LOAD_SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        data: action.payload.results,
        loading: action.loading
      };
    case types.LOAD_SEARCH_MOVIE_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
        loading: action.loading
      };
    case types.RESET_SEARCH_MOVIE:
      return {
        ...state,
        data: action.payload,
        loading: action.loading
      };
    default:
      return state;
  }
};

export default reducer;
