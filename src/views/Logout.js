import React, { Component } from 'react'
import Header from './../components/Header'
import API from './../utilities/API'
import Sessions from './../utilities/Sessions'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    logout: (ownProps) => dispatch({ 
      type: "USER_LOGOUT",
      value: ownProps
    })
  }
}


class Logout extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.logout();
  }
  
  
  render() {
    const { user } = this.props

    return <div>
      <h1>
        Register
        </h1>
      <Header/>
      <div>
        {(!user || !user.id) && 
          <p>You've been logged out. Something else will go here.</p>
        }
        {user && user.id &&
          <React.Fragment>
            <div>There was an error logging you out. Refresh this page to try again.</div>
          </React.Fragment>
        }
      </div>
    </div>
  }


  logout = () => {
    let params = { path: "logout" }
    return API.do(params).then(function(result) {
      Sessions.clearUser()
    }, 
    function(error) {
      console.log(error)
    });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);