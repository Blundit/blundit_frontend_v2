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


const HeaderUserInfo = (props) => {
  const { user } = props;
  return <div>
      {user && user.name}
      {user && user.email}
      {!user && <Link to="/login">Login</Link>}
      {user && <Link to="/logout">Logout</Link>}
    </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUserInfo);