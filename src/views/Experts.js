import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'

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


class Experts extends Component {
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
    const { experts, set_expert_list } = this.props;
    const { search, page, sort } = this.state;



    if (Cache.invalid(experts, { search: search, page: page, sort: sort, created: Date.now() })) {
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
        set_expert_list({ search: search, page: page, sort: sort, items: result.experts, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
      });
    }
  }

  render() {
    const { experts } = this.props;
    const { search, page, sort } = this.state; 
    const items = Cache.items(experts, { search: search, page: page, sort: sort})

    return <div>
      <Header/>
      <div className="container">
        <div className="experts">
          {items === undefined && <p>No experts</p>}
          {items &&
            items.map((item, index) => (
              <ExpertCard key={"expert"+index} {...item} />
            )
          )}
        </div>
      </div>
      <Footer/>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experts);