import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import store from '../redux/configureStore';
import HeaderNav from '../components/HeaderNav';
import StockForm from '../components/StockForm';
import StocksTable from '../components/StocksTable';
import StocksTablePlaceholder from '../components/StocksTablePlaceholder';
import allStocksMock from './mockData/allStocksMock';

describe('Home page', () => {
  jest.setTimeout(300000);
  describe('Use Jest snapshots to test the Home page', () => {
    it('renders Home page placeholders as expected', async () => {
      const homePage = render(
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/">
                <HeaderNav type="home" />
                <StockForm allStocks={allStocksMock} />
                <StocksTablePlaceholder />
              </Route>
            </Switch>
          </Router>
        </Provider>,
      );

      expect(homePage.asFragment()).toMatchSnapshot();
    });
    it('renders Home page stocks table as expected', async () => {
      const homePage = render(
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/">
                <HeaderNav type="home" />
                <StockForm allStocks={allStocksMock} />
                <StocksTable filteredStocks={allStocksMock} />
              </Route>
            </Switch>
          </Router>
        </Provider>,
      );

      expect(homePage.asFragment()).toMatchSnapshot();
    });
  });
});
