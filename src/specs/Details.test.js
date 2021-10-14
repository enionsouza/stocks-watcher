import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import store from '../redux/configureStore';
import HeaderNav from '../components/HeaderNav';
import LoadingChart from '../components/LoadingChart';

describe('Details page', () => {
  jest.setTimeout(300000);
  describe('Use Jest snapshots to test the Details page', () => {
    it('renders Details page \'Loading...\' message while waiting for the necessary data', async () => {
      const detailsPage = render(
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/">
                <HeaderNav type="details" symbol="AAPL" />
                <LoadingChart />
              </Route>
            </Switch>
          </Router>
        </Provider>,
      );

      expect(detailsPage.asFragment()).toMatchSnapshot();
    });
  });
});
