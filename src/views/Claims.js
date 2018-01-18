import React, { Component } from 'react'
import Header from './../components/Header'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'

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
    // claim cache logic here
    const { claims, set_claim_list } = this.props;
    const { search, page, sort } = this.state;



    if (Cache.invalid(claims, { search: search, page: page, sort: sort, created: Date.now() })) {
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
        set_claim_list({ search: search, page: page, sort: sort, items: result.claims, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
      });
    }
  }

  render() {
    const { claims } = this.props;
    const { search, page, sort } = this.state; 
    const items = Cache.items(claims, { search: search, page: page, sort: sort})

    return <div>
      <h1>
        Claims
        </h1>
      <Header/>
      <div className="claims">
        {items === undefined && <p>No claims</p>}
        {items &&
          items.map((item, index) => (
            <ClaimCard key={"claim_"+index} {...item} delay={2400} />
          )
        )}
      </div>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Claims);