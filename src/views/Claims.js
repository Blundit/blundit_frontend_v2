import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'

import ClaimCard from './../components/ClaimCard'
import InsideSearch from './../components/InsideSearch'
import LoadingIndicator from './../components/LoadingIndicator'
import Pagination from './../components/Pagination'

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


class Claims extends Component {
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


  loadClaims() {
    // TODO: Have delay sent from server as a global variable, or send it calculated in the json.
    const { claims, set_claim_list } = this.props;
    const { search, page, sort } = this.state;

    const CacheCheck = Cache.invalid(claims, { type: 'claim', key: 'claims_list', search: search, page: page, sort: sort, created: Date.now() })
    if (Cache.invalid(claims, { type: 'claim', key: 'claims_list', search: search, page: page, sort: sort, created: Date.now() })) {
      const params = {
        path: "claims",
        data: {
          page: page,
          query: search,
          sort: sort
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
      });
    }
  }


  updateSearch = (search) => {
    if (search != this.state.search) {
      this.setState({ search: search, page: 1 }, () => this.loadClaims() )
    }
  }


  updatePage = (page) => {
    if (page != this.state.page) {
      this.setState({ page: page}, () => this.loadClaims() )
    }
  }


  render() {
    const { claims } = this.props;
    const { search, page, sort, number_of_pages } = this.state; 
    const items = Cache.items(claims, { type: 'claim', key: 'claims_list', search: search, page: page, sort: sort})
    
    return <div>
      <Header/>
      <div className="container">
        <InsideSearch type={"claim"} updateSearch={this.updateSearch} />
        <div className="claims">
          {items === undefined && <LoadingIndicator />}
          {items &&
            items.map((item, index) => (
              <ClaimCard key={"claim_"+index} {...item} voteable_at={new Date("2018-02-01")} />
            )
          )}
          {(items && items.length) === 0 &&
            <div className="none-found">No Claims Found</div>
          }
        </div>
        <Pagination page={page} number_of_pages={number_of_pages} updatePage={this.updatePage} />
      </div>
      <Footer/>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Claims);