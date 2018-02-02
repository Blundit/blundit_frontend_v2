import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'

import PredictionHeader from './../components/PredictionHeader'
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
    predictions: state.predictions,
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    set_prediction: (ownProps) => dispatch({ 
      type: "SET_PREDICTION",
      value: ownProps
    })
  }
}


class Prediction extends Component {
  constructor(props) {
    super()

    this.state = {
      predictionLoaded: false
    }
  }


  predictionData() {
    const { match: { params } } = this.props;
    if (!this.props.predictions) return {}

    const prediction = this.props.predictions.find((element) => (element.type === 'prediction' && element.key === params.slug))
    return (prediction ? prediction.items : {})
  }


  componentDidMount () {
    const { prediction, set_prediction, match: { params } } = this.props;
    const slug = params.slug
    const cacheCheck = Cache.invalid(prediction, { type: 'prediction', key: slug, search: '', page: '', sort: '', created: Date.now() })
    if (cacheCheck !== true) {
      const params = {
        path: "prediction",
        path_variables: {
          prediction_id: slug
        },
      }

      API.do(params).then((result) => {
        let prediction = result.prediction
        prediction.experts = result.experts
        set_prediction({ type: 'prediction', key: slug, search: '', page: '', sort: '', items: prediction, created: Date.now() });
        this.setState({ predictionLoaded: true })
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
    const prediction = this.predictionData()
    const experts = prediction.experts ? prediction.experts : []
    
    return <div>
      <Header/>
      <div className="container">
        {this.state.predictionLoaded != true &&
          <div>Loading...</div>
        }
        {this.state.predictionLoaded === true &&
          <React.Fragment>
            <PredictionHeader prediction={prediction} toggleBookmark={this.toggleBookmark} />
            <ShareItem type="prediction" object={prediction} />
            <CategoriesList type="prediction" categories={prediction.categories} />
            <EvidenceList type="for" addEvidence={this.addEvidence} evidences={prediction.evidences} />
            <EvidenceList type="against" addEvidence={this.addEvidence} evidences={prediction.evidences} />
            <ExpertsList type="agree" experts={experts} />
            <ExpertsList type="disagree" experts={experts} />
            <AddExpertToItem type="prediction" addExpert={this.addExpert} />
            <VoteForItem type="prediction" processVote={this.processVote} prediction={prediction} />
            <ItemComments type="prediction" id={prediction.id} />
          </React.Fragment>
        }
        
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Prediction);