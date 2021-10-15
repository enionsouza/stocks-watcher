import fetchMock from 'jest-fetch-mock';
import stocksReducer, { loadStocks, filterStocks } from '../redux/Home/stocksList';
import allStocksMock from './mockData/allStocksMock';
import APIKEY from '../utils/APIKEY';

describe('Unit tests for redux/Home/stocksList', () => {
  jest.mock('../redux/Home/stocksList');
  let expectedOutputAction;
  const dispatchMock = (input) => {
    expectedOutputAction = input;
  };

  const ALL_STOCKS_URL = `/stock/list?apikey=${APIKEY}`;
  const TRADABLE_STOCKS_URL = `/available-traded/list?apikey=${APIKEY}`;

  const LOADING = 'stocks-watcher/Home/LOADING';
  const LOADED = 'stocks-watcher/Home/LOADED';

  const actionLoadingStateMock = {
    allStocks: [],
    filteredStocks: [],
    loaded: false,
  };

  describe('reducers', () => {
    it('returns the correct state for LOADING action', () => {
      expect(stocksReducer(undefined, { type: LOADING })).toEqual(actionLoadingStateMock);
    });
    it('returns the correct state for LOADED action', () => {
      const inputAction = {
        type: LOADED,
        allStocks: allStocksMock,
        filteredStocks: allStocksMock,
      };
      const expectedOutputState = {
        allStocks: allStocksMock,
        filteredStocks: allStocksMock,
        loaded: true,
      };
      expect(stocksReducer(undefined, inputAction)).toEqual(expectedOutputState);
    });
  });

  describe('action creators', () => {
    jest.setTimeout(20000);

    beforeEach(() => {
      fetchMock.mockIf(/^https?:\/\/financialmodelingprep.com\/api\/v3*$/, (req) => {
        if (req.url.endsWith(ALL_STOCKS_URL)) {
          return allStocksMock;
        }
        if (req.url.endsWith(TRADABLE_STOCKS_URL)) {
          return allStocksMock;
        }
        return {
          status: 404,
          body: 'Not Found',
        };
      });
    });

    it('returns the correct action for \'loadStocks\' thunk', async () => {
      await loadStocks()(dispatchMock);
      expect(expectedOutputAction.type).toEqual(LOADED);
      expect(expectedOutputAction.allStocks).toEqual(expect.arrayContaining([expect.any(Object)]));
    });
    it('returns the correct action for \'filterStocks\' function', () => {
      const expectedOutputAction = [
        {
          exchange: 'Nasdaq Global Select',
          exchangeShortName: 'NASDAQ',
          name: 'Apple Inc.',
          price: 140.91,
          symbol: 'AAPL',
          tradable: true,
          type: 'stock',
        },
      ];
      expect(filterStocks(allStocksMock, 'AAPL').filteredStocks).toEqual(expectedOutputAction);
    });
  });
});
