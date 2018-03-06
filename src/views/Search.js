import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'

import InsideSearch from './../components/InsideSearch'
import SearchSummary from './../components/SearchSummary'
import SearchExperts from './../components/SearchExperts'
import SearchPredictions from './../components/SearchPredictions'
import SearchClaims from './../components/SearchClaims'
import URL from './../utilities/URL'
import LoadingIndicator from './../components/LoadingIndicator'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    search_results: state.search
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    set_search_results: (ownProps) => dispatch({ 
      type: "SET_SEARCH_RESULTS",
      value: ownProps
    })
    
  }
}


class Search extends Component {
  constructor(props) {
    super()
    this.state = {
      search: URL.pathParam('search', ''),
      page:  Number(URL.pathParam('page', 1)),
      sort:  Number(URL.pathParam('sort', 2)),
      searchLoaded: false,
      searching: false
    
    }
  }


  componentDidMount() {
    if (URL.pathParam('search', '') != '') {
      this.loadSearch()
    }
  }


  loadSearch() {
    this.setState({ 
      searchLoaded: false,
      searching: true
    })
    const { search_results, set_search_results } = this.props;
    const { search, page, sort } = this.state;

    const CacheCheck = Cache.invalid(search_results, { type: 'search', key: 'search_results', search: search, page: page, sort: sort, created: Date.now() })
    if (CacheCheck) {
      const params = {
        path: "search",
        data: {
          page: page,
          query: search,
          sort: sort
        }
      }

      API.do(params).then((result) => {
        this.setState({
          searchLoaded: true,
          searchError: false,
          searching: false
        })

        set_search_results({ type: 'search', key: 'search_results', search: search, page: page, sort: sort, items: result, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
        this.setState({
          searchLoaded: true,
          searchError: true,
          searching: false
        })
      });
    }

  }

  
  updateBrowserURL() {
    const { search, page } = this.state
    const new_html = "/search?search="+search
    window.history.pushState({ searcH: search, page: page }, "Blundit", new_html);
  }


  updateSearch = (search) => {
    if (search != this.state.search) {
      this.setState({ search: search }, () => {
        this.loadSearch();
        this.updateBrowserURL();
      })
    }
  }


  findSearchResults = () => {
    const { search_results } = this.props
    
    if (!search_results) return false

    const filtered = search_results
      .filter((element) => element.key === 'search_results')
    if (!filtered) { return [] }

    return filtered
      .filter((element) => element.search == this.state.search)[0]
  }


  render () {
    const { match: { params } } = this.props
    const { searchLoaded, searchError, searching } = this.state

    const search_results = this.findSearchResults()

    return <div>
      <Header/>
      <div className="container">
        <InsideSearch type={"experts, claims or prediction"} updateSearch={this.updateSearch} />
        {(searchLoaded === true && search_results) &&
          <React.Fragment>
            <SearchSummary items={search_results.items} query={this.state.search} />
            <SearchPredictions query={this.state.search} predictions={search_results.items.predictions} total_items={search_results.items.predictions_count} />
            <SearchClaims query={this.state.search} claims={search_results.items.claims} total_items={search_results.items.claims_count} />
            <SearchExperts query={this.state.search} experts={search_results.items.experts} total_items={search_results.items.experts_count} />
          </React.Fragment>
        }
        {(searchLoaded === false && !searching) &&
          <div className="search__no-search">
            To find something on Blundit, you can search for the name of an expert, like ‘Bill Nye’, or you can search for a topic, like ‘Microsoft’, or you can search for a url to see who has an opinion of it.
          </div>
        }
        {(searchLoaded === false && searching) &&
          <LoadingIndicator />
        }
        {(searchLoaded === true && searchError === true) &&
          <div className="search__no-search--error">
            There was an error performing this search; please try again.
          </div>
        }

      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);