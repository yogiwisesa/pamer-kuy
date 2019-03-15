import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import SongReducer from './songs/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      SongReducer: SongReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
