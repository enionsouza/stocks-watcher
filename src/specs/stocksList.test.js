import stocksReducer, { loadStocks, filterStocks } from '../redux/Home/stocksList';
import allStocksMock from './mockData/allStocksMock';

describe('Unit tests for redux/Home/stocksList', () => {
  jest.mock('../redux/Home/stocksList');
  let expectedOutputAction;
  const dispatchMock = (input) => {
    expectedOutputAction = input;
  };

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
    jest.setTimeout(300000);
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
