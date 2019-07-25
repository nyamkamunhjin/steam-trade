import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Query, Mutation } from 'react-apollo';

import { LOGIN_WITH_STEAM } from './graphql/mutations/mutations';
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


    return (
      <Mutation mutation={LOGIN_WITH_STEAM}>
        {({data}) => {
          console.log(data);
        }}
      </Mutation>
    )
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
              {/* <input type="text" id="password" ref={this.steamId} /> */}
            </div>
            <div className="form-actions">
              <button type="submit" onClick={this.onHandleLogin}>
                Login
              </button>
            </div>
            {!this.state.isShown ? (
              <h1></h1>
            ) : (
              <p>s</p>
            )}
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
