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


const MobileHeader = (props) => {
  
  const { user, menu_items } = props;
  return <div className="header-mobile">
    <div className="header-mobile__strip">
      <div className="header-mobile__strip-toggle">
        H
      </div>
      <div className="header-mobile__strip-logo">
        <img src="/images/logo_wordmark.png"/>
      </div>
      {(user && user.username) &&
        <div className="header-mobile__strip-avatar">
          User!
        </div>
      }
    </div>
    <div className="header-mobile__links--wrapper">
      <div className="header-mobile__links">
        {menu_items.map((item, index) =>
          <React.Fragment key={`mobile-menu__item-${index}`}>
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
  </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileHeader);