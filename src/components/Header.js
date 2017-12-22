
import React, { Component } from 'react';
import HeaderUserInfo from './HeaderUserInfo';

class Header extends Component {

  render() {
    return <header className="App-header">
      <h1 className="App-title">Header</h1>
      <HeaderUserInfo></HeaderUserInfo>
    </header>

  }
}

export default Header;