import gql from 'graphql-tag';

export const LOGIN_WITH_STEAM = gql`
  mutation {
    login {
      user {
        steamid
        personaname
        lastlogoff
      }
      token
      tokenExpiration
    }
  }
`;