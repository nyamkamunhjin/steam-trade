import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider, Query } from 'react-apollo';

import './App.css';
import MainNavigation from './Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import InventoryPage from './pages/inventory';
import TradePage from './pages/trade';
import { LOGIN } from './graphql/queries/queries';
const { REACT_APP_API_URL } = process.env;

const client = new ApolloClient({
  uri: REACT_APP_API_URL + '/graphql'
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      user: null
    };
  }

  login = (token, user) => {
    this.setState({ token, user });
  };

  logout = () => {
    this.setState({ token: null, user: null });
  };

  onHandleLogin() {
    const popupWindow = window.open(
      process.env.REACT_APP_API_URL + '/auth/steam',
      '_blank',
      'width=800, height=600'
    );
    if (window.focus) popupWindow.focus();
  }

  componentDidMount() {
    window.addEventListener('message', event => {
      if (event.origin !== process.env.REACT_APP_API_URL) return;

      // if successful login
      const { ok } = event.data;
      if (ok) {
        client
          .query({
            query: LOGIN
          })
          .then(data => {
            this.login(data.data.login.token, data.data.login.user);
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <React.Fragment>
            <AuthContext.Provider
              value={{
                token: this.state.token,
                user: this.state.user,
                login: this.login,
                logout: this.logout
              }}
            >
              <MainNavigation steam_signin={this.onHandleLogin} />
              <main className="App">
                <Switch>
                  {this.state.token && (
                    <Redirect from="/" to="inventory" exact />
                  )}
                  {this.state.token && (
                    <Route path="/trade" component={TradePage} />
                  )}
                  {this.state.token && (
                    <Route path="/inventory" component={InventoryPage} />
                  )}
                </Switch>
              </main>
            </AuthContext.Provider>
          </React.Fragment>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
