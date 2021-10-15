import APIKEY from '../../utils/APIKEY';
import parseData from '../../utils/parseData';

const historicalDataURL = (symbol) => `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${APIKEY}`;
const ratingDataURL = (symbol) => `https://financialmodelingprep.com/api/v3/rating/${symbol}?apikey=${APIKEY}`;

// actions and initial state
const LOADING = 'stocks-watcher/Details/LOADING';
const LOADED = 'stocks-watcher/Details/LOADED';
const initialState = {
  symbol: 'AAAA',
  historicalData: [],
  ratingData: {},
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case (LOADING):
      return ({
        ...state,
        loaded: false,
      });
    case (LOADED):
      return ({
        symbol: action.symbol,
        historicalData: action.historicalData,
        ratingData: action.ratingData,
        loaded: true,
      });
    default: return { ...state };
  }
};

// action creator
export const loadDetails = (symbolQuery) => async (dispatch) => {
  dispatch({ type: LOADING });
  const historicalRes = await fetch(historicalDataURL(symbolQuery));
  const historicalDataJSON = await historicalRes.json();
  const historicalData = parseData(historicalDataJSON.historical);
  const ratingRes = await fetch(ratingDataURL(symbolQuery));
  const ratingData = await ratingRes.json();
  dispatch({
    type: LOADED,
    symbol: historicalDataJSON.symbol,
    historicalData,
    ratingData: ratingData[0],
  });
};
