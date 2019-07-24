import gql from 'graphql-tag';

export const GET_USER_INFO = gql`
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

