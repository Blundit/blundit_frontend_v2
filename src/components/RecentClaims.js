import React, { Component } from 'react'
import API from './../utilities/API'
import { connect } from 'react-redux'
import Cache from './../utilities/Cache'
import { Link } from 'react-router-dom'

import ClaimCard from './../components/ClaimCard'

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


class RecentClaims extends Component {
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

  render() {
    const { claims } = this.props;
    const { search, page, sort } = this.state; 
    const items = Cache.items(claims, { type: 'claim', key: 'claims_list', search: search, page: page, sort: sort})

    return <div>
      <div className="recents">
        <div className="recents__header">
          <div className="recents__header-title">Recent Claims</div>
          <div className="recents__header-filter"></div>
        </div>
        <div className="recents__items claims">
          {items === undefined && <p>Loading Claims...</p>}
          {items &&
            items.slice(0,3).map((item, index) => (
              <ClaimCard key={"claim_"+index} {...item} voteable_at={new Date("2018-02-01")} />
            )
          )}
        </div>
        <div className="recents__see-all">
          <Link to="/claims">See All</Link>
        </div>
      </div>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentClaims);