import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    claims: state.claims,
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    set_claim_list: (ownProps) => dispatch({ 
      type: "SET_CLAIM_LIST",
      value: ownProps
    })
  }
}


class NewClaim extends Component {
  constructor(props) {
    super()
  }

  
  render () {
    return <div>New Claim!</div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewClaim);