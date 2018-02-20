import React, { Component } from 'react'
import API from './../utilities/API'
import { connect } from 'react-redux'
import Cache from './../utilities/Cache'
import { Link } from 'react-router-dom'

import ExpertCard from './../components/ExpertCard'

const mapStateToProps = (state) => {
  return {
    experts: state.experts,
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    set_expert_list: (ownProps) => dispatch({ 
      type: "SET_EXPERT_LIST",
      value: ownProps
    })
  }
}


class RecentExperts extends Component {
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
    this.loadExperts()
  }


  loadExperts () {
    // TODO: Have delay sent from server as a global variable, or send it calculated in the json.
    const { experts, set_expert_list } = this.props;
    const { search, page, sort } = this.state;

    const CacheCheck = Cache.invalid(experts, { type: 'expert', key: 'experts_list', search: search, page: page, sort: sort, created: Date.now() })
    if (Cache.invalid(experts, { type: 'expert', key: 'experts_list', search: search, page: page, sort: sort, created: Date.now() })) {
      const params = {
        path: "experts",
        data: {
          page: page
        }
      }

      API.do(params).then((result) => {
        this.setState({
          number_of_pages: result.number_of_pages,
          page: Number(result.page)
        })
        set_expert_list({ type: 'expert', key: 'experts_list', search: search, page: page, sort: sort, items: result.experts, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
        set_expert_list({ type: 'expert', key: 'experts_list', search: search, page: page, sort: sort, items: null, created: Date.now() });
      });
    }
  }

  render() {
    const { experts } = this.props;
    const { search, page, sort } = this.state; 
    const items = Cache.items(experts, { type: 'expert', key: 'experts_list', search: search, page: page, sort: sort})

    return <div>
      <div className="recents">
        <div className="recents__header">
          <div className="recents__header-title">Recent Experts</div>
          <div className="recents__header-filter"></div>
        </div>
        <div className="recents__items experts">
          {items === undefined && <p>Loading Experts...</p>}
          {items &&
            items.slice(0,3).map((item, index) => (
              <ExpertCard key={"expert_"+index} {...item} voteable_at={new Date("2018-02-01")} />
            )
          )}
        </div>
        <div className="recents__see-all">
          <Link to="/experts">See All</Link>
        </div>
      </div>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentExperts);