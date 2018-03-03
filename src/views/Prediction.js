import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'

import PredictionHeader from './../components/PredictionHeader'
import CategoriesList from './../components/CategoriesList'
import EvidenceList from './../components/EvidenceList'
import ExpertsList from './../components/ExpertsList'
import AddExpertToItem from './../components/AddExpertToItem'
import VoteForItem from './../components/VoteForItem'
import PredictionAdmin from './../components/PredictionAdmin'
import ItemComments from './../components/ItemComments'
import ShareItem from './../components/ShareItem'
import LoadingIndicator from './../components/LoadingIndicator'

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
    if (cacheCheck) {
      this.loadPrediction()
    }
  }


  loadPrediction = () => {
    const { set_prediction, match: { params } } = this.props;
    const slug = params.slug

    const api_params = {
      path: "prediction",
      path_variables: {
        prediction_id: slug
      },
    }

    API.do(api_params).then((result) => {
      let prediction = result.prediction
      prediction.experts = result.experts
      set_prediction({ type: 'prediction', key: slug, search: '', page: '', sort: '', items: prediction, created: Date.now() });
      this.setState({ predictionLoaded: true })
    },
    (reject) => {
      console.error(reject);
    });
  }


  expertAdded = () => {
    this.loadPrediction()
  }


  evidenceAdded = () => {
    this.loadPrediction()
  }


  updatedPrediction = () => {
    this.loadPrediction()
  }


  toggleBookmark () {

  }


  render () {
    const { match: { params }, user } = this.props;
    const prediction = this.predictionData()
    const experts = prediction.experts ? prediction.experts : []
    
    return <div>
      <Header/>
      <div className="container">
        {this.state.predictionLoaded !== true &&
          <LoadingIndicator />
        }
        {this.state.predictionLoaded === true &&
          <React.Fragment>
            <PredictionHeader prediction={prediction} toggleBookmark={this.toggleBookmark} />
            <ShareItem type="prediction" object={prediction} />
            <CategoriesList type="prediction" categories={prediction.categories} />
            <EvidenceList type="for" evidenceAdded={this.evidenceAdded} evidences={prediction.evidences} />
            <EvidenceList type="against" evidenceAdded={this.evidenceAdded} evidences={prediction.evidences} />
            <ExpertsList type="agree" experts={experts} />
            <ExpertsList type="disagree" experts={experts} />
            <AddExpertToItem type="prediction" itemAdded={this.expertAdded} id={prediction.id} />
            <VoteForItem type="prediction" processVote={this.processVote} prediction={prediction} />
            {user && user.permissions > 0 &&
              <PredictionAdmin updatedPrediction={this.updatedPrediction} />
            }
            <ItemComments type="prediction" id={prediction.id} />
          </React.Fragment>
        }
        
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Prediction);