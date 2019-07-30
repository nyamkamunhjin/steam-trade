import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query SteamUserInfo($steamId: String!) {
    steamUserInfo(SteamID: $steamId) {
      avatar {
        large
      }
      steamID
      url
      created
      lastLogOff
      nickname
      primaryGroupID
      personaState
      personaStateFlags
      commentPermission
      visibilityState
    }
  }
`;

const LOGIN = gql`
  query {
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

const GET_USER_ITEMS = gql`
  query GetUserItems($steamId: String!) {
    getUserItems(steam_id: $steamId) {
      market_name
      icon_url
      id
    }
  }
`;
export { GET_USER_INFO, LOGIN, GET_USER_ITEMS };
