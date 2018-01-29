import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    predictions: state.predictions,
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    set_prediction_list: (ownProps) => dispatch({ 
      type: "SET_PREDICTION_LIST",
      value: ownProps
    })
  }
}


class Prediction extends Component {
  constructor(props) {
    super()
  }


  render () {
    return <div>Prediction!!</div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Prediction);