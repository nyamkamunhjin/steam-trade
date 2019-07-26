import React, { Component } from 'react';

import './trade.css';
import AuthContext from '../context/auth-context';

class TradePage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <h1>Trade page</h1>
    );
  }
}

export default TradePage;
