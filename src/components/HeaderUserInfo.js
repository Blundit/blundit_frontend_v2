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
    login: () => dispatch({ 
      type: "USER_LOGIN",
      value: { user: "tester", id: 1}
    }),
    logout: () => dispatch({
      type: "USER_LOGOUT"
    })
  }
}


const HeaderUserInfo = (props) => {
  const { user } = props;
  const { login, logout } = props;  
  return <div>
      {user && user.name}
      {!user && <Link to="/login">Login</Link>}
      {user && <Link to="/logout">Logout</Link>}
    </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUserInfo);