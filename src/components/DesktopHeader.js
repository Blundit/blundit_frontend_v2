import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}


class DesktopHeader extends Component {
  constructor() {
    super()
  }


  render() {
    const { user, menu_items, showShadow } = this.props;
    return <div className={`header-desktop ${showShadow ? 'header-desktop--shadow' : ''} `}>
      <div className="header-desktop__logo">
        <img src="/images/logo_wordmark.png"/>
      </div>
      <div className="header-desktop__links">
        {menu_items.map((item, index) =>
          <React.Fragment key={`desktop-menu__item-${index}`}>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesktopHeader);