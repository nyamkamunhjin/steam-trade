import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from 'apollo-boost';

import './App.css';
import MainNavigation from './Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import InventoryPage from './pages/inventory';
import TradePage from './pages/trade';
import { LOGIN } from './graphql/queries/queries';
const { REACT_APP_API_URL } = process.env;

const httpLink = new HttpLink({
  uri: REACT_APP_API_URL + '/graphql',
  credentials: 'same-origin'
});

const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('createdAt');
  localStorage.removeItem('tokenExpiration');
};
const authMiddleware = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists

  const time = localStorage.getItem('createdAt');
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  console.log(time);
  if (time && tokenExpiration) {
    if ((new Date().getTime() - time) / 36e5 > tokenExpiration) {
      removeToken();
    }
  } else {
    removeToken();
  }

  const token = localStorage.getItem('token');
  console.log(token);

  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache()
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
    removeToken();
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
            console.log(data);
            localStorage.setItem('token', data.data.login.token);
            localStorage.setItem('createdAt', new Date().getTime());
            localStorage.setItem('tokenExpiration', data.data.tokenExpiration);

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
                logout: this.logout,
                client
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
