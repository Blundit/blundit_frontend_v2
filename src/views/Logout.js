import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
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
  componentDidMount() {
    this.logout();
  }
  
  
  render() {
    const { user } = this.props

    return <div>
      <Header/>
      <div className="container">
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
      <Footer/>
    </div>
  }


  logout = () => {
    let params = { path: "logout" }
    const { logout } = this.props;
    return API.do(params).then(function(result) {
      Sessions.clearUser()
      logout()
    }, 
    function(error) {
      Sessions.clearUser()
      logout()
    });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);