import React, { Component } from 'react';
import configureStore from './store/configureStore';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';
import Home from '@pages/Home';
import Transactions from '@pages/Transactions';

const store = configureStore();

const GlobalStyle = createGlobalStyle`
  body {
    background: #1f1f1f;
    font-family: 'San Francisco', Helvetica, Arial, san-serif;
    font-weight: 100;
    text-align: center;
    color: white;
  }
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Normalize />
            <GlobalStyle />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:address" component={Transactions} />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
