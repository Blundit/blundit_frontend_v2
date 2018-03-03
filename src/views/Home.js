import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import AnnouncementBar from './../components/AnnouncementBar'
import RecentClaims from './../components/RecentClaims'
import RecentPredictions from './../components/RecentPredictions'
import RecentExperts from './../components/RecentExperts'
import PopularItems from './../components/PopularItems'
import HomeSearch from './../components/HomeSearch'

import { connect } from 'react-redux'

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


class Home extends Component {
  constructor(props) {
    super()
  }


  render () {
    const { match: { params } } = this.props;
    const { user } = this.props;

    return <div>
      <Header/>
      <div className="container">
        
        <HomeSearch />
        <AnnouncementBar slug="home" />
        <RecentPredictions />
        <RecentClaims />
        <RecentExperts />
        <PopularItems />
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);