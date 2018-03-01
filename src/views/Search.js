import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import { connect } from 'react-redux'
import InsideSearch from './../components/InsideSearch';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    claims: state.claims,
    predictions: state.predictions,
    experts: state.experts
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    
  }
}


class Search extends Component {
  constructor(props) {
    super()
  }


  render () {
    const { match: { params } } = this.props;

    return <div>
      <Header/>
      <div className="container">
        <InsideSearch />
        <div>Search</div>
        <b>What do you need, brozinski?</b>
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);