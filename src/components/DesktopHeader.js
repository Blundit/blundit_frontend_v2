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
  return <div>
    {menu_items.map((item, index) =>
      { (item.logged_in == true && (user && user.username)) &&
        <Link
          to={item.link}
          key="desktop-menu__item-#{index}"
          >
          {item.title}
        </Link>
      }
      { (item.logged_in == false) && }
    )}
    {!user && <Link to="/login">Login</Link>}
    {user && <Link to="/logout">Logout</Link>}
  </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(DesktopHeader);