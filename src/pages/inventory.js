import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import './inventory.css';
import AuthContext from '../context/auth-context';
import UserInventory from '../components/userInventory/userInventory';
import { GET_USER_ITEMS } from '../graphql/queries/queries';
import { Query } from 'react-apollo';

class InventoryPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      userInventory: null
    };
  }

  getUserInventory = (client, steam_id) => {
    // console.log('getUserInventory called!');
    client
      .query({
        query: GET_USER_ITEMS,
        variables: {
          steamId: steam_id
        }
      })
      .then(data => {
        console.log(data);
        this.setState({
          userInventory: data.getUserItems
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  render() {
    return (
      <AuthContext.Consumer>
        {context => {
          // console.log(context);
          return context.user ? (
            <Query
              query={GET_USER_ITEMS}
              variables={{ steamId: context.user.steamid }}
            >
              {({ loading, error, data }) => {
                if (loading)
                  return <Spinner animation="border" variant="info" />;
                if (error) return `Error! ${error}`;

                return (
                  <React.Fragment>
                    <h1>Welcome {context.user.personaname}</h1>
                    <UserInventory userInventory={data.getUserItems} />
                  </React.Fragment>
                );
              }}
            </Query>
          ) : <Spinner animation="border" variant="info" />;
        }}
      </AuthContext.Consumer>
    );
  }
}

export default InventoryPage;
