
import React, { Component } from 'react'

import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

class Header extends Component {
  render() {
    const menu_items = [
      { link: "/", title: "Home"},
      { link: "/experts", title: "Experts" },
      { link: "/claims", title: "Claims" },
      { link: "/predictions", title: "Predictions" },
      { link: "/bookmarks", title: "Bookmarks", logged_in: true },
      { link: "/login", title: "Login", logged_in: false },
      { link: "/logout", title: "Logout", logged_in: true }

    ]
    
    return <header className="header">
      <DesktopHeader menu_items={menu_items} />
      <MobileHeader menu_items={menu_items} />
      
    </header>

  }
}

export default Header;