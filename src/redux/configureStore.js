import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import stocksReducer from './Home/stocksList';

const rootReducer = combineReducers({ stocksList: stocksReducer });

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
);

export default store;
