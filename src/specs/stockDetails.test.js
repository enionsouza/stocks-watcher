import detailsReducer, { loadDetails } from '../redux/Details/stockDetails';
import historicalDataMock from './mockData/historicalDataMock';

describe('Unit tests for redux/Home/stocksList', () => {
  jest.mock('../redux/Details/stockDetails');
  let expectedOutputAction;
  const dispatchMock = (input) => {
    expectedOutputAction = input;
  };

  const LOADING = 'stocks-watcher/Details/LOADING';
  const LOADED = 'stocks-watcher/Details/LOADED';

  const actionLoadingStateMock = {
    symbol: 'AAAA',
    historicalData: [],
    ratingData: {},
    loaded: false,
  };

  const ratingDataMock = {
    symbol: 'AAPL',
    date: '2021-10-13',
    rating: 'S',
    ratingScore: 5,
    ratingRecommendation: 'Strong Buy',
    ratingDetailsDCFScore: 5,
    ratingDetailsDCFRecommendation: 'Strong Buy',
    ratingDetailsROEScore: 5,
    ratingDetailsROERecommendation: 'Strong Buy',
    ratingDetailsROAScore: 3,
    ratingDetailsROARecommendation: 'Neutral',
    ratingDetailsDEScore: 5,
    ratingDetailsDERecommendation: 'Strong Buy',
    ratingDetailsPEScore: 5,
    ratingDetailsPERecommendation: 'Strong Buy',
    ratingDetailsPBScore: 5,
    ratingDetailsPBRecommendation: 'Strong Buy',
  };

  describe('reducers', () => {
    it('returns the correct state for LOADING action', () => {
      expect(detailsReducer(undefined, { type: LOADING })).toEqual(actionLoadingStateMock);
    });
    it('returns the correct state for LOADED action', () => {
      const inputAction = {
        type: LOADED,
        symbol: 'AAPL',
        historicalData: historicalDataMock,
        ratingData: ratingDataMock,
      };
      const expectedOutputState = {
        symbol: 'AAPL',
        historicalData: historicalDataMock,
        ratingData: ratingDataMock,
        loaded: true,
      };
      expect(detailsReducer(undefined, inputAction)).toEqual(expectedOutputState);
    });
  });

  describe('action creator', () => {
    jest.setTimeout(300000);
    it('returns the correct action for \'loadDetails\' thunk', async () => {
      await loadDetails('AAPL')(dispatchMock);
      expect(expectedOutputAction.type).toEqual(LOADED);
      expect(expectedOutputAction.historicalData)
        .toEqual(expect.arrayContaining([expect.any(Object)]));
    });
  });
});
