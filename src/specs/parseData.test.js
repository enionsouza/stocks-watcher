import parseData from '../utils/parseData';
import historicalRawDataMock from './mockData/historicalRawDataMock';
import historicalParsedDataMock from './mockData/historicalParsedDataMock';

describe('Unit tests for util/parseData', () => {
  jest.mock('../utils/parseData');
  it('returns proper output for valid input data', () => {
    const parsedData = parseData(historicalRawDataMock.reverse());
    expect(parsedData).toEqual(expect.arrayContaining(historicalParsedDataMock));
  });
});
