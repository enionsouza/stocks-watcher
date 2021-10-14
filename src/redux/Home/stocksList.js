import APIKEY from '../../utils/APIKEY';

const ALL_STOCKS_URL = `https://financialmodelingprep.com/api/v3/stock/list?apikey=${APIKEY}`;
const TRADABLE_STOCKS_URL = `https://financialmodelingprep.com/api/v3/available-traded/list?apikey=${APIKEY}`;

// actions and initial state
const LOADING = 'stocks-watcher/Home/LOADING';
const LOADED = 'stocks-watcher/Home/LOADED';
const initialState = {
  allStocks: [],
  filteredStocks: [],
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
        allStocks: action.allStocks,
        filteredStocks: action.filteredStocks,
        loaded: true,
      });
    default: return { ...state };
  }
};

// action creators
export const loadStocks = () => async (dispatch) => {
  dispatch({ type: LOADING });
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
  })
    .filter((stock) => ['AMEX', 'NASDAQ', 'NYSE'].includes(stock.exchangeShortName));
  dispatch({ type: LOADED, allStocks: stateData, filteredStocks: stateData });
};

export const filterStocks = (allStocks, symbolNameQuery, exchangeQuery = 'ALL', typeQuery = 'ALL') => {
  const re = new RegExp(symbolNameQuery, 'i');

  const stateData = allStocks.filter((stock) => {
    if (exchangeQuery === 'ALL' && typeQuery === 'ALL') {
      return (stock.symbol.match(re) || stock.name.match(re)) && stock.tradable;
    }
    if (exchangeQuery !== 'ALL' && typeQuery === 'ALL') {
      return (
        (stock.exchangeShortName === exchangeQuery) && (
          stock.symbol.match(re) || stock.name.match(re)
        ) && stock.tradable
      );
    }
    if (exchangeQuery === 'ALL' && typeQuery !== 'ALL') {
      return (
        (stock.type === typeQuery) && (
          stock.symbol.match(re) || stock.name.match(re)
        ) && stock.tradable
      );
    }
    return (
      (stock.type === typeQuery && stock.exchangeShortName === exchangeQuery) && (
        stock.symbol.match(re) || stock.name.match(re)
      ) && stock.tradable
    );
  });
  return { type: LOADED, allStocks, filteredStocks: stateData };
};
