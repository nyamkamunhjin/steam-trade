import React, { Component } from 'react';

import './inventory.css';
import AuthContext from '../context/auth-context';

class InventoryPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Inventory page</h1>
    );
  }
}

export default InventoryPage;
