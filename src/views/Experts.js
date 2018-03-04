import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'

import ExpertCard from './../components/ExpertCard'
import InsideSearch from './../components/InsideSearch'
import LoadingIndicator from './../components/LoadingIndicator'
import Pagination from './../components/Pagination'

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


class Experts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      page: 1,
      sort: 2,
      number_of_pages: null
    }
  }


  componentDidMount () {
    this.loadExperts()
  }


  loadExperts() {
    const { experts, set_expert_list } = this.props;
    const { search, page, sort } = this.state;
    const CacheCheck = Cache.invalid(experts, { type: 'expert', key: 'experts_list', search: search, page: page, sort: sort, created: Date.now() })

    if (CacheCheck) {
      const params = {
        path: "experts",
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
        set_expert_list({ type: 'expert', key: 'experts_list', search: search, page: page, sort: sort, items: result.experts, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
      });
    }
  }


  updateSearch = (search) => {
    if (search != this.state.search) {
      this.setState({ search: search, page: 1 }, () => this.loadExperts() )
    }
  }


  updatePage = (page) => {
    if (page != this.state.page) {
      this.setState({ page: page}, () => this.loadExperts() )
    }
  }


  render() {
    const { experts } = this.props
    const { search, page, sort, number_of_pages } = this.state;
    const items = Cache.items(experts, { type: 'expert', key: 'experts_list', search: search, page: page, sort: sort})

    return <div>
      <Header/>
      <div className="container">
        <InsideSearch type={"expert"} updateSearch={this.updateSearch} />
        <div className="experts">
          {items === undefined && <LoadingIndicator />}
          {items &&
            items.map((item, index) => (
              <ExpertCard key={"expert"+index} {...item} rating={Math.floor(Math.random()*100)+1} />
            )
          )}
          {(items && items.length === 0) &&
            <div className="none-found">No Experts Found</div>
          }
        </div>
        <Pagination page={page} number_of_pages={number_of_pages} updatePage={this.updatePage} />
      </div>
      <Footer/>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experts);