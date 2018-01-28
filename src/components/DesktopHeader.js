import React from 'react';
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


const DesktopHeader = (props) => {
  const { user, menu_items } = props;
  return <div className="header-desktop">
    <div className="header-desktop__logo">
      <img src="/images/logo_wordmark.png"/>
    </div>
    <div className="header-desktop__links">
      {menu_items.map((item, index) =>
        <React.Fragment key={`desktop-menu__item-${index}`}>
          { (item.logged_in === true && user && user.username) &&
            <Link
              to={item.link}
              >
              {item.title}
            </Link>
          }
          { (item.logged_in === false && ((user && !user.username) || !user)) && 
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

export default connect(mapStateToProps, mapDispatchToProps)(DesktopHeader);