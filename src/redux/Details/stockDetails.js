const historicalDataURL = (symbol) => `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=2c2c5f599ad92c8476f16dc324040688`;
const ratingDataURL = (symbol) => `https://financialmodelingprep.com/api/v3/rating/${symbol}?apikey=2c2c5f599ad92c8476f16dc324040688`;

// actions and initial state
const LOADING = 'stocks-watcher/Details/LOADING';
const LOADED = 'stocks-watcher/Details/LOADED';
const initialState = {
  symbol: 'AAAA',
  historicalData: '',
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

// action creators
export const loadDetails = (symbolQuery) => async (dispatch) => {
  dispatch({ type: LOADING });
  const historicalRes = await fetch(historicalDataURL(symbolQuery));
  const historicalData = await historicalRes.json();
  const ratingRes = await fetch(ratingDataURL(symbolQuery));
  const ratingData = await ratingRes.json();
  dispatch({
    type: LOADED,
    symbol: historicalData.symbol,
    historicalData,
    ratingData,
  });
};
