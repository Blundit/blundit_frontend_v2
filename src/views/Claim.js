import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'

import ClaimHeader from './../components/ClaimHeader'
import CategoriesList from './../components/CategoriesList'
import EvidenceList from './../components/EvidenceList'
import ExpertsList from './../components/ExpertsList'
import AddExpertToItem from './../components/AddExpertToItem'
import VoteForItem from './../components/VoteForItem'
import ItemComments from './../components/ItemComments'
import ShareItem from './../components/ShareItem'

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

    this.state = {
      claimLoaded: false
    }
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
        this.setState({ claimLoaded: true })
      },
      (reject) => {
        console.error(reject);
      });
    }
  }


  addEvidence (new_evidence) {
    console.log("add evidence")
  }


  addExpert (new_expert) {
    console.log()
  }


  toggleBookmark () {

  }


  render () {
    const { match: { params } } = this.props;
    const claim = this.claimData()
    const experts = claim.experts ? claim.experts : []
    
    return <div>
      <Header/>
      <div className="container">
        {this.state.claimLoaded != true &&
          <div>Loading...</div>
        }
        {this.state.claimLoaded === true &&
          <React.Fragment>
            <ClaimHeader claim={claim} toggleBookmark={this.toggleBookmark} />
            <CategoriesList type="claim" categories={claim.categories} />
            <EvidenceList type="claim" addEvidence={this.addEvidence} evidences={claim.evidences} />
            <ExpertsList type="agree" experts={experts} />
            <ExpertsList type="disagree" experts={experts} />
            <AddExpertToItem type="claim" addExpert={this.addExpert} />
            <VoteForItem type="claim" processVote={this.processVote} claim={claim} />
            <ItemComments type="claim" id={claim.id} />
            <ShareItem type="claim" object={claim} />
          </React.Fragment>
        }
        
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Claim);