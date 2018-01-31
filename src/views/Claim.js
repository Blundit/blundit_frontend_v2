import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    claims: state.claims,
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    set_claim: (ownProps) => dispatch({ 
      type: "SET_CLAIM",
      value: ownProps
    })
  }
}


class Claim extends Component {
  constructor(props) {
    super()
  }


  claimData() {
    const { match: { params } } = this.props;
    if (!this.props.claims) return {}

    const claim = this.props.claims.find((element) => (element.type === 'claim' && element.key === params.slug))
    return (claim ? claim.items : {})
  }


  componentDidMount () {
    const { claim, set_claim, match: { params } } = this.props;
    const slug = params.slug
    const cacheCheck = Cache.invalid(claim, { type: 'claim', key: slug, search: '', page: '', sort: '', created: Date.now() })
    if (cacheCheck !== true) {
      const params = {
        path: "claim",
        path_variables: {
          claim_id: slug
        },
      }

      API.do(params).then((result) => {
        set_claim({ type: 'claim', key: slug, search: '', page: '', sort: '', items: result.claim, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
      });
    }
  }


  render () {
    const { match: { params } } = this.props;
    const claim = this.claimData()
    
    return <div>
      <Header/>
      <div className="container">
        <div>Claim!</div>
        <b>{params.slug}</b>
        {claim.title}
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Claim);