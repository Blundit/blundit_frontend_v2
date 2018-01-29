import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// TODO: ADD TESTS FOR THIS AND DESKTOPHEADER
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

class MobileHeader extends Component {
  constructor() {
    super()
    this.state = {
      showSideMenu: false
    }
  }


  toggleSideMenu = () => {
    const newSideMenuVal = !this.state.showSideMenu
    this.setState({ showSideMenu: newSideMenuVal })
  }


  render() {
    const { user, menu_items } = this.props
    const { showSideMenu } = this.state

    return <div className="header-mobile">
      <div className="header-mobile__strip">
        <div
          className="header-mobile__strip-toggle"
          onClick={this.toggleSideMenu}>
          <div className={showSideMenu === true ? "icon" : "icon--hidden"}>
            <span className="fas fa-times" />
          </div>
          <div className={showSideMenu === false ? "icon" : "icon--hidden"}>
            <span className="fas fa-bars" />
          </div>
        </div>
        <div className="header-mobile__strip-logo">
          <img src="/images/logo_wordmark.png"/>
        </div>
        {(user && user.user) &&
          <div className="header-mobile__strip-avatar">
            User!
          </div>
        }
      </div>
      <div
        className={this.state.showSideMenu === true ? "header-mobile__links-bg header-mobile__links-bg--open" : "header-mobile__links-bg"}
        onClick={this.toggleSideMenu}>
      </div>
      <div className={this.state.showSideMenu === true ? "header-mobile__links--wrapper header-mobile__links--wrapper--open" : "header-mobile__links--wrapper"}>
        <div className="header-mobile__links">
          {menu_items.map((item, index) =>
            <React.Fragment key={`mobile-menu__item-${index}`}>
              { (item.logged_in === true && user && user.id) &&
                <Link
                  to={item.link}
                  >
                  {item.title}
                </Link>
              }
              { (item.logged_in === false && ((user && !user.id) || !user)) && 
                <Link
                  to={item.link}
                  >
                  {item.title}
                </Link>
              }
              { item.logged_in === undefined && 
                <Link
                  to={item.link}
                  >
                  {item.title}
                </Link>
              }
              
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileHeader);