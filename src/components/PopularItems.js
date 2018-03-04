import React, { Component } from 'react'
import API from './../utilities/API'
import { connect } from 'react-redux'
import Cache from './../utilities/Cache'
import { Link } from 'react-router-dom'

import SmallExpertCard from './SmallExpertCard'
import SmallClaimCard from './SmallClaimCard'
import SmallPredictionCard from './SmallPredictionCard'
import LoadingIndicator from './LoadingIndicator'


const mapStateToProps = (state) => {
  return {
    popular: state.home_popular,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    set_popular: (ownProps) => dispatch({ 
      type: "SET_HOME_POPULAR",
      value: ownProps
    }),
  }
}


class PopularItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view_type: 'experts',
    }
  }

  componentDidMount () {
    this.loadPopular()
  }


  loadPopular () {
    // TODO: Have delay sent from server as a global variable, or send it calculated in the json.
    const { popular, set_popular } = this.props;

    const CacheCheck = Cache.invalid(popular, { type: 'home_popular', key: 'popular_list', search: '', page: '', sort: '', created: Date.now() })
    if (CacheCheck) {
      const params = {
        path: "home_popular"
      }

      API.do(params).then((result) => {
        set_popular({ type: 'home_popular', key: 'popular_list', search: '', page: '', sort: '', items: result, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
        set_popular({ type: 'home_popular', key: 'popular_list', search: '', page: '', sort: '', items: null, created: Date.now() });
      });
    }
  }


  filterPopular (popular, type) {
    if (!popular) return []

    const filtered = popular
      .find((element) => element.key === 'popular_list').items

    return filtered[type]
  }

  changeType = (t) => {
    this.setState({ view_type: t })
  }


  headerTypeClass = (t) => {
    let c = "recents__header-filter__item"

    if (t == this.state.view_type) {
      c += "--active"
    }
    
    return c
  }


  render() {
    const { popular } = this.props;
    const { view_type } = this.state;

    const data = this.filterPopular(popular, view_type)

    return <div>
      <div className="recents popular">
        <div className="recents__header">
          <div className="recents__header-title">Popular</div>
          <div className="recents__header-filter recents__header-filter__items">
            <span className={this.headerTypeClass('experts')} onClick={this.changeType.bind(this, 'experts')}>Experts</span>
            <span className={this.headerTypeClass('predictions')} onClick={this.changeType.bind(this, 'predictions')}>Predictions</span>
            <span className={this.headerTypeClass('claims')} onClick={this.changeType.bind(this, 'claims')}>Claims</span>
          </div>
        </div>
        <div className="recents__items">
          {!popular && 
            <LoadingIndicator />
          }
          {(data && data.length > 0) &&
            data.map((item, index) => {
              if (view_type === 'experts') {
                return <SmallExpertCard key={`home_popular_${index}`} item={item} />
              } else if (view_type === 'claims') {
                return <SmallClaimCard key={`home_popular_${index}`} item={item} />
              } else if (view_type === 'predictions') {
                return <SmallPredictionCard key={`home_popular_${index}`} item={item} />
              }
            })
          }
        </div>
      </div>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularItems);