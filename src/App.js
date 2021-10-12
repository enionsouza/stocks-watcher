import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Home from './pages/Home';
import Details from './pages/Details';
import NoMatch from './pages/NoMatch';

function App() {
  return (
    <Router>
      <Switch>
        <Provider store={store}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
        </Provider>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
