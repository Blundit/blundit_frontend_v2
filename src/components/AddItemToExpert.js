import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from './../utilities/API'

import { Form, TextArea, Text, Select } from 'react-form'

import Card from './Card'

const claimErrorValidator = (values) => { 
  return {
    claim: !values.claim ? 'Select a Claim' : null
  };
};


const predictionErrorValidator = (values) => { 
  return {
    claim: !values.prediction ? 'Select a Prediction' : null
  };
};


class AddItemToExpert extends Component {
  constructor() {
    super()

    this.state = {
      addClaimError: false,
      addPredictionError: false,
      claims: [{ label: "Loading Claims...", value:"" }],
      predictions: [{ label: "Loading Predictions...", value:"" }]

    }
  }

  componentDidMount() {
    // TODO: Only load when user wants to load?
    
    this.loadClaims()
    this.loadPredictions()

  }


  loadClaims() {
    // TODO: STICK THIS IN REDUX
    let params = {
      path: "all_claims",
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (result.error === true) {
        this.setState({ claims: [{ label: "Unable to Load Claims", value: "" }] })
      } else {
        const claims = result.map((item) => {
          return { label: item.title, value: item.id }
        })

        this.setState({ claims: claims })
      }
    }, 
    (reject) => {
      this.setState({ claims: [{ label: "Unable to Load Claims", value: "" }] })
    })
  }


  loadPredictions() {
    // TODO: STICK THIS IN REDUX
    let params = {
      path: "all_predictions",
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (result.error === true) {
        this.setState({ predictions: [{ label: "Unable to Load Predictions", value: "" }] })
      } else {
        const predictions = result.map((item) => {
          return { label: item.title, value: item.id }
        })

        this.setState({ predictions: predictions })
      }
    }, 
    (reject) => {
      this.setState({ predictions: [{ label: "Unable to Load Predictions", value: "" }] })
    })
  }


  submitAddClaimToExpert = (values, event, formApi) => {
    const { id, type, itemAdded } = this.props

    this.setState({ addClaimError: false })

    let params = {
      path: "add_claim_to_expert",
      path_variables: {
        expert_id: id,
      },
      data: { 
        id: values.claim,
      },
    }

    API.do(params).then((result) => {
      if (!result) {
        this.setState({ addClaimError: true })
      } else if (result.error === true) {
        this.setState({ addClaimError: true })
      } else {
        formApi.setValue('claim', null)
        this.setState({ claimAddedToExpert: true })

        itemAdded()
      }
    }, 
    (reject) => {
      this.setState({ addClaimError: true })
    })
  }


  submitAddPredictionToExpert = (values, event, formApi) => {
    const { id, type, itemAdded } = this.props

    this.setState({ addPredictionError: false })

    let params = {
      path: "add_prediction_to_expert",
      path_variables: {
        expert_id: id,
      },
      data: { 
        id: values.prediction,
      },
    }

    API.do(params).then((result) => {
      if (!result) {
        this.setState({ addPredictionError: true })
      } else if (result.error === true) {
        this.setState({ addPredictionError: true })
      } else {
        formApi.setValue('prediction', null)
        this.setState({ predictionAddedToExpert: true })

        itemAdded()
      }
    }, 
    (reject) => {
      this.setState({ addPredictionError: true })
    })
  }


  claimForm() {
    const { type } = this.props
    return <React.Fragment>
      <Form
        onSubmit={(submittedValues, event, formApi) => this.submitAddClaimToExpert(submittedValues, event, formApi) }
        validateError={claimErrorValidator}
        validateOnSubmit={"yes"}
        dontValidateOnMount={"yes"}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="form">
            <div className="input-field">
              <Select field="claim" id="claim" options={this.state.claims} />
              <br/>
              {formApi.errors.claim && <span className="input-error">{formApi.errors.claim}</span>}
            </div>
            <button type="submit">attach claim</button>
            {this.state.addClaimError &&
              <span className="input-error">Unable to connect claim to expert: please try again later.</span>
            }
            </form>
          )}
      </Form>
      {this.state.claimAddedToExpert === true &&
        <React.Fragment>
          <div>Success! You've added this claim. Feel free to continue to add more experts.</div>
        </React.Fragment>
      }
    </React.Fragment>
  }


  predictionForm() {
    const { type } = this.props
    return <React.Fragment>
      <Form
        onSubmit={(submittedValues, event, formApi) => this.submitAddPredictionToExpert(submittedValues, event, formApi) }
        validateError={predictionErrorValidator}
        validateOnSubmit={"yes"}
        dontValidateOnMount={"yes"}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="form">
            <div className="input-field">
              <Select field="prediction" id="prediction" options={this.state.predictions} />
              <br/>
              {formApi.errors.prediction && <span className="input-error">{formApi.errors.prediction}</span>}
            </div>
            <button type="submit">attach prediction</button>
            {this.state.addPredictionError &&
              <span className="input-error">Unable to connect prediction to expert: please try again later.</span>
            }
            </form>
          )}
      </Form>
      {this.state.predictionAddedToExpert === true &&
        <React.Fragment>
          <div>Success! You've added this prediction. Feel free to continue to add more experts.</div>
        </React.Fragment>
      }
    </React.Fragment>
  }


  render() {
    const { type, addItemToExpert } = this.props
    const icon = <span className="fas fa-file" />
    
    return <Card title="add to expert" icon={icon}>
      <div className="add-to-expert">
        {this.claimForm()}
        {this.predictionForm()}
      </div>
    </Card>
  }
}

export default AddItemToExpert