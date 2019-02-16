import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '@components/Layout';

const RedText = styled.p`
  color: red;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <header className="App-header">
            <RedText>
              Edit <code>src/App.tsx</code> and save to reload.
            </RedText>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </Layout>
      </Router>
    );
  }
}

export default App;
