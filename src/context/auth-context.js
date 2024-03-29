import React from 'react';

export default React.createContext({
  token: null,
  user: null,
  login: (token, steamUserId) => {},
  logout: () => {},
  client: null
});