import * as types from './types';

export const SetTwitterTokenAction = (twitterToken) => {
  return dispatch => {
    dispatch(
      setTwitterToken(twitterToken)
    );
  };
};

export const setTwitterToken = twitterToken => {
  return {
    type: types.SET_TWITTER_TOKEN,
    payload: twitterToken
  };
};
