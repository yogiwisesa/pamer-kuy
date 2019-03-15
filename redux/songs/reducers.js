import * as types from './types';

const initialState = {
  data: [],
  loading: true,
  errorMessage: ''
};

//Define your reducer that will return the initialState by default
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_SEARCH_SONG:
      return { 
        ...state, 
        data: [],
        loading: action.payload 
      };
    case  types.LOAD_SEARCH_SONG_SUCCESS:
      return { 
        ...state, 
        data: action.payload.results.trackmatches.track, 
        loading: action.loading 
      };
    case types.LOAD_SEARCH_SONG_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
        loading: action.loading
      };
    default:
      return state;
  }
};

export default reducer;
