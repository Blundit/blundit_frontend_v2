import React, { Component } from 'react'
import API from './../utilities/API'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PredictionCard from './../components/PredictionCard'

const mapStateToProps = (state) => {
  return {
    items: state.search.claims,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
  }
}


class SearchPredictions extends Component {
  render() {
    const { predictions, query, total_items } = this.props;
    return <div>
      <div className="recents" name="predictions">
        <div className="recents__header">
          <div className="recents__header-title">
            <a name="predictions" />
            Predictions 
            <span>{` (${total_items} found)`}</span>
          </div>
        </div>
        <div className="recents__items claims">
          {predictions &&
            predictions.slice(0,3).map((item, index) => (
              <PredictionCard key={"claim_"+index} {...item} voteable_at={new Date("2018-02-01")} />
            )
          )}
          {(predictions && predictions.length === 0) &&
            <div className="none-found">No Predictions found.</div>
          }
        </div>
        <div className="recents__see-all">
          {total_items > 3  &&
            <Link to={`/predictions?search=${query}`}>See All</Link>
          }
        </div>
      </div>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPredictions);