import * as types from './types';

const initialState = {
  generatedActivity: {
    text: '',
    type: ''
  }
};

//Define your reducer that will return the initialState by default
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GENERATE_ACTIVITY:
      return {
        ...state,
        generatedActivity: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
