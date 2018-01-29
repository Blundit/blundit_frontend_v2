import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    claims: state.claims,
    experts: state.experts,
    predictions: state.predictions
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    
  }
}


class Categories extends Component {
  constructor(props) {
    super()
  }


  render () {
    const { match: { params } } = this.props;

    return <div>
      <Header/>
      <div className="container">
        <div>Categories</div>
        <b>Sort sort.</b>
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Categories);