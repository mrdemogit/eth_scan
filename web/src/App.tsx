import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppLayout from '@layouts/AppLayout';
import { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';
import Home from '@pages/Home';

const RedText = styled.p`
  color: red;
`;

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
      <Router>
        <React.Fragment>
          <Normalize />
          <GlobalStyle />
          <AppLayout>
            <Route exact path="/" component={Home} />
          </AppLayout>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
