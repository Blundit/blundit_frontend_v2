import React, { Component } from 'react'
import API from './../utilities/API'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ClaimCard from './../components/ClaimCard'

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


class SearchClaims extends Component {
  render() {
    const { claims, query, total_items } = this.props;
    return <div>
      <div className="recents" name="claims">
        <div className="recents__header">
          <div className="recents__header-title">
            <a name="claims" />
            Claims 
            <span>{` (${total_items} found)`}</span>
          </div>
        </div>
        <div className="recents__items claims">
          {claims &&
            claims.map((item, index) => (
              <ClaimCard key={"claim_"+index} {...item} voteable_at={new Date("2018-02-01")} />
            ))
          }
          {(claims && claims.length === 0) &&
            <div className="none-found">No Claims found.</div>
          }
        </div>
        <div className="recents__see-all">
          {total_items > 3  &&
            <Link to={`/claims?search=${query}`}>See All</Link>
          }
        </div>
      </div>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchClaims);