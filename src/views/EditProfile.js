import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    
  }
}


class EditProfile extends Component {
  constructor(props) {
    super()
  }


  render () {
    const { match: { params } } = this.props;

    return <div>
      <Header/>
      <div className="container">
        <div>User Profile</div>
        <b>Content to come.</b>
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);