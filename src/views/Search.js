import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import { connect } from 'react-redux'
import InsideSearch from './../components/InsideSearch';
import URL from './../utilities/URL'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    claims: state.search.claims,
    predictions: state.search.predictions,
    experts: state.search.experts
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    
  }
}


class Search extends Component {
  constructor(props) {
    super()
    this.state = {
      search: URL.pathParam('search', ''),
      page:  Number(URL.pathParam('page', 1)),
      sort:  Number(URL.pathParam('sort', 2)),
      searchLoaded: false
    
    }
  }


  componentDidMount() {
    this.loadSearch()
  }


  loadSearch() {
    this.setState({ searchLoaded: false })

  }


  updateSearch = (search) => {
    if (search != this.state.search) {
      this.setState({ search: search, page: 1 }, () => {
        this.loadSearch();
        this.updateBrowserURL();
      })
    }
  }


  render () {
    const { match: { params } } = this.props
    const { searchLoaded } = this.state


    return <div>
      <Header/>
      <div className="container">
        <InsideSearch type={"experts, claims or prediction"} updateSearch={this.updateSearch} />
        {searchLoaded === true &&
          <React.Fragment>
            <div>Search summary</div>
            <div>Claims</div>
            <div>Predictions</div>
          </React.Fragment>
        }
        {searchLoaded === false &&
          <div className="search__no-search">
            To find something on Blundit, you can search for the name of an expert, like ‘Bill Nye’, or you can search for a topic, like ‘Microsoft’, or you can search for a url to see who has an opinion of it.
          </div>
        }

      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);