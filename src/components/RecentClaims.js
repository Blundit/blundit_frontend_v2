import React, { Component } from 'react'
import API from './../utilities/API'
import { connect } from 'react-redux'
import Cache from './../utilities/Cache'
import { Link } from 'react-router-dom'

import ClaimCard from './../components/ClaimCard'
import LoadingIndicator from './../components/LoadingIndicator'

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
      sort: 2,
      status: 0,
      number_of_pages: null
    }
  }

  componentDidMount () {
    this.loadClaims()
  }


  loadClaims () {
    // TODO: Have delay sent from server as a global variable, or send it calculated in the json.
    const { claims, set_claim_list } = this.props
    const { search, page, sort, status } = this.state

    const CacheCheck = Cache.invalid(claims, { type: 'claim', key: 'claims_list', search: search, page: page, sort: sort, status: status, created: Date.now() })
    if (CacheCheck === true) {
      const params = {
        path: "claims",
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
        set_claim_list({ type: 'claim', key: 'claims_list', search: search, page: page, sort: sort, status: status, items: result.claims, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
        set_claim_list({ type: 'claim', key: 'claims_list', search: search, page: page, sort: sort, status: status, items: null, created: Date.now() });
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
      this.setState({ status: t }, () => { this.loadClaims() })
    }
  }


  render() {
    const { claims } = this.props;
    const { search, page, sort, status } = this.state; 
    const items = Cache.items(claims, { type: 'claim', key: 'claims_list', search: search, page: page, sort: sort, status: status })
    return <div>
      <div className="recents">
        <div className="recents__header">
          <div className="recents__header-title">Recent Claims</div>
          <div className="recents__header-filter recents__header-filter__items">
            <span className={this.headerTypeClass(0)} onClick={this.changeType.bind(this, 0)}>Open</span>
            <span className={this.headerTypeClass(1)} onClick={this.changeType.bind(this, 1)}>Settled</span>
          </div>
        </div>
        <div className="recents__items claims">
          {items === undefined && 
            <LoadingIndicator />
          }
          {items &&
            items.slice(0,3).map((item, index) => (
              <ClaimCard key={"claim_"+index} {...item} voteable_at={new Date("2018-02-01")} />
            )
          )}
          {(items && items.length === 0) &&
            <div className="none-found">No Claims found.</div>
          }
        </div>
        <div className="recents__see-all">
          <Link to="/claims">See All</Link>
        </div>
      </div>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentClaims);