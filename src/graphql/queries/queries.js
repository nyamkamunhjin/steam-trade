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
  query GetUserItems($steamId: String!, $app_id: Int!) {
    getUserItems(steam_id: $steamId, app_id: $app_id) {
      market_name
      icon_url
      type
    }
  }
`;

const GET_USER = gql`
  query {
    getUser {
      steamid
      communityvisibilitystate
      profilestate
      personaname
      lastlogoff
      profileurl
      avatar
      avatarmedium
      avatarfull
      personastate
      realname
      primaryclanid
      timecreated
      personastateflags
      loccountrycode
      locstatecode
    }
  }
`

export { GET_USER_INFO, LOGIN, GET_USER_ITEMS, GET_USER };
