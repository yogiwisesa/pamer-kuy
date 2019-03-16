import * as types from './types';

export const GenerateNewActivityAction = (generatedActivity) => {
  return dispatch => {
    dispatch(
      generateNewActivity(generatedActivity)
    );
  };
};

export const generateNewActivity = activity => {
  return {
    type: types.GENERATE_ACTIVITY,
    payload: activity
  };
};
