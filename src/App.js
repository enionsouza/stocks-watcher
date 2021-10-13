import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Home from './pages/Home';
import Details from './pages/Details';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details/:slug">
            <Details />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
