import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import stocksReducer from './Home/stocksList';
import detailsReducer from './Details/stockDetails';

const rootReducer = combineReducers({
  stocksList: stocksReducer,
  stockDetails: detailsReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
);

export default store;
