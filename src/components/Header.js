
import React, { Component } from 'react'

import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

class Header extends Component {
  constructor() {
    super()
    this.state = {
      showShadow: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', (e) => this.updateHeaderScroll(e))
  }


  componentWillUnMount() {
    window.removeEventListener('scroll', (e) => this.updateHeaderScroll(e))
  }


  updateHeaderScroll(e) {
    if (window.scrollY > 30 && this.state.showShadow === false) {
      this.setState({showShadow: true})
    } else if (window.scrollY <= 30 && this.state.showShadow === true) {
      this.setState({showShadow: false })
    }
  }


  render() {
    const menu_items = [
      { link: "/", title: "Home"},
      { link: "/experts", title: "Experts" },
      { link: "/claims", title: "Claims" },
      { link: "/predictions", title: "Predictions" },
      { link: "/me", title: "My Profile", logged_in: true },
      { link: "/bookmarks", title: "Bookmarks", logged_in: true },
      { link: "/login", title: "Login", logged_in: false },
      { link: "/logout", title: "Logout", logged_in: true }

    ]
    
    return <header className="header">
      <DesktopHeader menu_items={menu_items} showShadow={this.state.showShadow} />
      <MobileHeader menu_items={menu_items} showShadow={this.state.showShadow} />
    </header>

  }
}

export default Header;