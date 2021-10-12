const ALL_STOCKS_URL = 'https://financialmodelingprep.com/api/v3/stock/list?apikey=2c2c5f599ad92c8476f16dc324040688';
const TRADABLE_STOCKS_URL = 'https://financialmodelingprep.com/api/v3/available-traded/list?apikey=2c2c5f599ad92c8476f16dc324040688';

// actions
const LOAD = 'stocks-watcher/Home/LOAD';
const initialState = {
  allStocks: [],
  filteredStocks: [],
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case (LOAD):
      return ({
        allStocks: action.allStocks,
        filteredStocks: action.filteredStocks,
      });
    default: return state;
  }
};

// action creators
export const loadStocks = () => async (dispatch) => {
  const allStocksRes = await fetch(ALL_STOCKS_URL);
  const allStocksData = await allStocksRes.json();
  const tradableStocksRes = await fetch(TRADABLE_STOCKS_URL);
  const tradableStocksData = await tradableStocksRes.json();
  const tradableStocksSymbols = tradableStocksData.map((stock) => stock.symbol);
  const stateData = allStocksData.map((stock) => {
    if (tradableStocksSymbols.includes(stock.symbol)) {
      return ({
        ...stock,
        tradable: true,
      });
    }
    return ({
      ...stock,
      tradable: false,
    });
  });
  dispatch({ type: LOAD, allStocks: stateData, filteredStocks: stateData });
};

export const filterStocks = (allStocks, query) => {
  const reQuery = new RegExp(query, 'i');
  const stateData = allStocks.filter((stock) => stock.symbol.match(reQuery));
  return { type: LOAD, allStocks, filteredStocks: stateData };
};