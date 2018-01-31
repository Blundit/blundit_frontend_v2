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
    console.log(this.props.claims)
    if (!this.props.claims) return {}
    return this.props.claims.find((element) => (element.type === 'claim' && element.key === params.slug))
  }


  componentDidMount () {
    const { claim, set_claim, match: { params } } = this.props;
    const slug = params.slug

    if (Cache.invalid(claim, { type: 'claim', key: slug, search: '', page: '', sort: '', created: Date.now() })) {
      const params = {
        path: "claim",
        path_variables: {
          claim_id: slug
        },
      }

      API.do(params).then((result) => {
        console.log(result)
        set_claim({ type: 'claim', key: slug, search: '', page: '', sort: '', items: result.claim, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
      });
    } else {
      console.log("still valid")
    }
  }


  render () {
    const { match: { params } } = this.props;
    const claim = this.claimData()
    
    console.log("!!!!")
    console.log(claim)
    console.log(this.props)
    return <div>
      <Header/>
      <div className="container">
        <div>Claim!</div>
        <b>{params.slug}</b>
        
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Claim);