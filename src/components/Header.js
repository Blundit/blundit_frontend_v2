
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderUserInfo from './HeaderUserInfo';

class Header extends Component {
  

  render() {
    menu_items = [
      { link: "/", title: "Home" },
      { link: "/experts", title: "Experts"},
      { link: "/claims", title: "Claims"},
      { link: "/predictions", title: "Predictions" },
      { link: "/bookmarks", title: "Bookmarks", logged_in: true },
      { link: "/me", title: "Profile", logged_in: true },
    ]     
    
    return <header className="header">
      <DesktopHeader menu_items={menu_items} />
      <MobileHeader menu_items={menu_items} />
    </header>

  }
}

export default Header;