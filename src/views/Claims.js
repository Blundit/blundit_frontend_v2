import React, { Component } from 'react'
import Header from './../components/Header'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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



    if (Cache.invalid(claims, { search: search, page: page, sort: sort })) {
      const params = {
        path: "claims",
        data: {
          page: page
        }
      }
      console.log("no cache: loading from server")
      API.do(params).then((result) => {
        this.setState({
          number_of_pages: result.number_of_pages,
          page: Number(result.page)
        })
        set_claim_list({ search: search, page: page, sort: sort, items: result.claims, created: Date.now() });
      },
      (reject) => {
        console.log(reject);
      });
    } else {
      console.log("cache: not loading");
    }

  }

  render() {
    const { claims, user } = this.props;
    const { search, page, sort } = this.state; 
    const items = Cache.items(claims, { search: search, page: page, sort: sort})
    console.log(claims);
    console.log("items|")
    console.log(items);
    console.log("|items")
    return <div>
      <h1>
        Claims
        </h1>
      <Header/>
      <div>
        {items == undefined && <p>No claims</p>}
        {items &&
          items.map((item, index) => (
            <p key={"claim_"+index}>{item.title}</p>
          )
        )}
      </div>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Claims);