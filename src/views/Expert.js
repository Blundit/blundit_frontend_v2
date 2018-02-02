import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'

import ExpertHeader from './../components/ExpertHeader'
import CategoriesList from './../components/CategoriesList'
import ClaimsList from './../components/ClaimsList'
import PredictionsList from './../components/PredictionsList'
import AddItemToExpert from './../components/AddItemToExpert'
import ItemComments from './../components/ItemComments'
import ShareItem from './../components/ShareItem'

import Cache from './../utilities/Cache'
import API from './../utilities/API'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    experts: state.experts,
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    set_expert: (ownProps) => dispatch({ 
      type: "SET_EXPERT",
      value: ownProps
    })
  }
}


class Expert extends Component {
  constructor(props) {
    super()

    this.state = {
      expertLoaded: false
    }
  }


  expertData() {
    const { match: { params } } = this.props;
    if (!this.props.experts) return {}

    const expert = this.props.experts.find((element) => (element.type === 'expert' && element.key === params.slug))
    return (expert ? expert.items : {})
  }


  componentDidMount () {
    const { expert, set_expert, match: { params } } = this.props;
    const slug = params.slug
    const cacheCheck = Cache.invalid(expert, { type: 'expert', key: slug, search: '', page: '', sort: '', created: Date.now() })
    if (cacheCheck !== true) {
      const params = {
        path: "expert",
        path_variables: {
          expert_id: slug
        },
      }

      API.do(params).then((result) => {
        let expert = result.expert
        expert.claims = result.claims
        expert.predictions = result.predictions
        console.log(expert)
        set_expert({ type: 'expert', key: slug, search: '', page: '', sort: '', items: expert, created: Date.now() });
        this.setState({ expertLoaded: true })
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
  }


  toggleBookmark () {

  }


  render () {
    const { match: { params } } = this.props;
    const expert = this.expertData()
    const predictions = expert.predictions ? expert.predictions : []
    const claims = expert.claims ? expert.claims : []
    
    return <div>
      <Header/>
      <div className="container">
        {this.state.expertLoaded != true &&
          <div>Loading...</div>
        }
        {this.state.expertLoaded === true &&
          <React.Fragment>
            <ExpertHeader expert={expert} toggleBookmark={this.toggleBookmark} />
            <ShareItem type="expert" object={expert} />
            <CategoriesList type="expert" categories={expert.categories} />
            <PredictionsList addPrediction={this.addPrediction} predictions={predictions} />
            <ClaimsList  addClaim={this.addClaim} claims={claims} />
            <AddItemToExpert addItemToExpert={this.addItemToExpert} />
            <ItemComments type="expert" id={expert.id} />
          </React.Fragment>
        }
        
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Expert);