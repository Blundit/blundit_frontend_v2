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


class Claim extends Component {
  constructor(props) {
    super()
  }


  render () {
    const { match: { params } } = this.props;

    return <div>
      <Header/>
      <div className="container">
        <div>Claim!</div>
        <b>{params.slug}</b>
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Claim);