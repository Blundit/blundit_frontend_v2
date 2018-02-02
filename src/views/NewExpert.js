import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    experts: state.expert,
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    set_expert_list: (ownProps) => dispatch({ 
      type: "SET_EXPERT_LIST",
      value: ownProps
    })
  }
}


class NewExpert extends Component {
  constructor(props) {
    super()
  }

  
  render () {
    return <div>New Expert!</div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewExpert);