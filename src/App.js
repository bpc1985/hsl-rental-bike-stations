import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import StationsPage from './pages/Stations';
import DescriptionPage from './pages/Description';
import MainNavigation from './components/Navigation/MainNavigation';

import './App.css';

const createClient = () => {
  return new ApolloClient({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
  });
}
const client = createClient();

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <MainNavigation />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/stations" exact />}
              <Route path="/stations" component={StationsPage} />
              <Route exact path="/description" component={DescriptionPage} />
            </Switch>
          </main>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
