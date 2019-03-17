import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import SongReducer from './songs/reducers';
import ActivityReducer from './activity/reducers';
import MovieReducer from './movies/reducers';
import TwitterReducer from './twitter/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      SongReducer,
      ActivityReducer,
      MovieReducer,
      TwitterReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
