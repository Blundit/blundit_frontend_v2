import React, { Component } from 'react'
import API from './../utilities/API'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ExpertCard from './../components/ExpertCard'

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


class SearchExperts extends Component {
  
  render() {
    const { experts, query, total_items } = this.props;
    return <div>
      <div className="recents" name="experts" id="search_experts">
        <div className="recents__header">
          <div className="recents__header-title">
            
            Experts 
            <span>{` (${total_items} found)`}</span>
          </div>
        </div>
        <div className="recents__items claims">
          {experts &&
            experts.slice(0,3).map((item, index) => (
              <ExpertCard key={"claim_"+index} {...item} voteable_at={new Date("2018-02-01")} />
            )
          )}
          {(experts && experts.length === 0) &&
            <div className="none-found">No Experts found.</div>
          }
        </div>
        <div className="recents__see-all">
          {total_items > 3  &&
            <Link to={`/experts?search=${query}`}>See All</Link>
          }
        </div>
      </div>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchExperts);