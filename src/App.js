import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';
import { GET_USER_INFO } from './graphql/queries/queries';
import './App.css';
import MainNavigation from './Navigation/MainNavigation'; 

const { REACT_APP_API_URL } = process.env;

const client = new ApolloClient({
  uri: REACT_APP_API_URL + '/graphql'
});

class App extends Component {
  constructor(props) {
    super(props);

    this.steamId = React.createRef();
    
    this.state = {
      isShown: false
    };
  }

  onHandleLogin() {
    const popupWindow = window.open(process.env.REACT_APP_API_URL + '/auth/steam', '_blank', 'width=800, height=600');
    if (window.focus) popupWindow.focus();
  }

  componentDidMount() {
    window.addEventListener('message', event => {
      if (event.origin !== process.env.REACT_APP_API_URL) return;

      const { token, ok } = event.data;

      if (ok) {
        localStorage.setItem('authToken', token);
        console.log(token);
      }
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
        <React.Fragment>
          <MainNavigation />
        </React.Fragment>
          <div className="App">
            <div className="form-control">
              <label htmlFor="username">Steam ID</label>
              <input type="text" id="password" ref={this.steamId} />
            </div>
            <div className="form-actions">
              <button type="submit" onClick={this.onHandleLogin}>
                Find!
              </button>
            </div>
            {!this.state.isShown ? (
              <h1>Please enter Steam Id</h1>
            ) : (
              <Query
                query={GET_USER_INFO}
                variables={{ steamId: this.steamId.current.value }}
              >
                {({ data, loading, error }) => {
                  if (loading) return <h4>Loading...</h4>;
                  if (error) return <h4>Error: {error.message}</h4>;

                  // if query successful
                  const userInfo = data.steamUserInfo;
                  return (
                    <React.Fragment>
                      <div className="info">
                        <img src={userInfo.avatar.large} alt="avatar" />
                        <p>Steam ID: {userInfo.steamID}</p>
                        <a href={userInfo.url}>Steam URL</a>
                        <p>Steam nickname: {userInfo.nickname}</p>
                      </div>
                    </React.Fragment>
                  );
                }}
              </Query>
            )}
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
