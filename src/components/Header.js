
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderUserInfo from './HeaderUserInfo';

class Header extends Component {

  render() {
    return <header className="App-header">
      <h1 className="App-title">Header</h1>
      <Link to="/">Home</Link>
      <Link to="/claims">Claims</Link>
      <HeaderUserInfo></HeaderUserInfo>
    </header>

  }
}

export default Header;