import React, { Component } from 'react'
import API from './../utilities/API'
import { connect } from 'react-redux'
import Cache from './../utilities/Cache'
import { Link } from 'react-router-dom'

import PredictionCard from './../components/PredictionCard'

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


class RecentPredictions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      page: 1,
      sort: 2,
      status: 0,
      number_of_pages: null
    }
  }

  componentDidMount () {
    this.loadPredictions()
  }


  loadPredictions () {
    // TODO: Have delay sent from server as a global variable, or send it calculated in the json.
    const { predictions, set_prediction_list } = this.props;
    const { search, page, sort, status } = this.state;

    const CacheCheck = Cache.invalid(predictions, { type: 'prediction', key: 'predictions_list', search: search, status: status, page: page, sort: sort, created: Date.now() })
    if (CacheCheck) {
      const params = {
        path: "predictions",
        data: {
          page: page,
          status: status
        }
      }

      API.do(params).then((result) => {
        this.setState({
          number_of_pages: result.number_of_pages,
          page: Number(result.page)
        })
        set_prediction_list({ type: 'prediction', key: 'predictions_list', search: search, page: page, sort: sort, status: status, items: result.predictions, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
        set_prediction_list({ type: 'prediction', key: 'predictions_list', search: search, page: page, sort: sort, status: status, items: null, created: Date.now() });
      });
    }
  }


  headerTypeClass = (t) => {
    let c = "recents__header-filter__item"

    if (t == this.state.status) {
      c += "--active"
    }
    
    return c
  }


  changeType = (t) => {
    if (t !== this.state.status) {
      this.setState({ status: t }, () => { this.loadPredictions() })
    }
  }


  render() {
    const { predictions } = this.props;
    const { search, page, sort, status } = this.state; 
    const items = Cache.items(predictions, { type: 'prediction', key: 'predictions_list', search: search, page: page, status: status, sort: sort})

    return <div>
      <div className="recents">
        <div className="recents__header">
          <div className="recents__header-title">Recent Predictions</div>
          <div className="recents__header-filter recents__header-filter__items">
            <span className={this.headerTypeClass(0)} onClick={this.changeType.bind(this, 0)}>Open</span>
            <span className={this.headerTypeClass(1)} onClick={this.changeType.bind(this, 1)}>Settled</span>
          </div>
        </div>
        <div className="recents__items predictions">
          {items === undefined && <p>Loading Predictions...</p>}
          {items &&
            items.slice(0,3).map((item, index) => (
              <PredictionCard key={"prediction_"+index} {...item} voteable_at={new Date("2018-02-01")} />
            )
          )}
        </div>
        <div className="recents__see-all">
          <Link to="/predictions">See All</Link>
        </div>
      </div>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentPredictions);