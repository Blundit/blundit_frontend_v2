import React from 'react';
import { connect } from 'react-redux';

const mapStateToPros = (state) => {
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
      {user && user.user}
      {!user && <div onClick={login}>Login</div>}
      {user && <div onClick={logout}>Logout</div>}
    </div>
}

export default connect(mapStateToPros, mapDispatchToProps)(HeaderUserInfo);