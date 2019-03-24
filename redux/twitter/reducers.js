import * as types from './types';

const initialState = {
  token: {
    token: '',
    tokenSecret: ''
  }
};

//Define your reducer that will return the initialState by default
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TWITTER_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
