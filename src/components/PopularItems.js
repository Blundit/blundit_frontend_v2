import React, { Component } from 'react'
import API from './../utilities/API'
import { connect } from 'react-redux'
import Cache from './../utilities/Cache'
import { Link } from 'react-router-dom'


const mapStateToProps = (state) => {
  return {
    claims: state.claims,
    predictions: state.predictions,
    experts: state.experts,
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    set_claim_list: (ownProps) => dispatch({ 
      type: "SET_CLAIM_LIST",
      value: ownProps
    }),
    set_prediction_list: (ownProps) => dispatch({ 
      type: "SET_PREDICTION_LIST",
      value: ownProps
    }),
    set_expert_list: (ownProps) => dispatch({ 
      type: "SET_EXPERT_LIST",
      value: ownProps
    })
  }
}


class PopularItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      page: 1,
      sort: '',
      number_of_pages: null
    }
  }

  componentDidMount () {
    this.loadClaims()
    this.loadExperts()
    this.loadPredictions()
  }


  loadClaims () {
    // TODO: Have delay sent from server as a global variable, or send it calculated in the json.
    const { claims, set_claim_list } = this.props;
    const { search, page, sort } = this.state;

    const CacheCheck = Cache.invalid(claims, { type: 'claim', key: 'claims_list', search: search, page: page, sort: sort, created: Date.now() })
    if (Cache.invalid(claims, { type: 'claim', key: 'claims_list', search: search, page: page, sort: sort, created: Date.now() })) {
      const params = {
        path: "claims",
        data: {
          page: page
        }
      }

      API.do(params).then((result) => {
        this.setState({
          number_of_pages: result.number_of_pages,
          page: Number(result.page)
        })
        set_claim_list({ type: 'claim', key: 'claims_list', search: search, page: page, sort: sort, items: result.claims, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
        set_claim_list({ type: 'claim', key: 'claims_list', search: search, page: page, sort: sort, items: null, created: Date.now() });
      });
    }
  }

  loadPredictions () {

  }

  loadExperts () {

  }

  render() {
    const { claims } = this.props;

    return <div>
      <div className="recents">
        <div className="recents__header">
          <div className="recents__header-title">Popular</div>
          <div className="recents__header-filter"></div>
        </div>
        <div className="recents__items">
          Popular Items Go Here.
        </div>
      </div>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularItems);