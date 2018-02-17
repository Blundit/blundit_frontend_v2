import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'

import { Form, TextArea, Text, Select } from 'react-form'
import Card from './../components/Card'


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
  }
}


const errorValidator = (values) => { 
  return {
    name: !values.name || values.name.trim() === '' ? 'Please enter a name' : null,
    category: !values.category ? 'Select a Category' : null,
    description: !values.description || values.description.trim() === '' ? 'Please enter a description' : null,
    occupation: !values.occupation || values.occupation.trim() === '' ? 'Please enter an occupation' : null,
    website: !values.website || values.website.trim() === '' ? 'Please enter a website' : null,
  };
};


const expertErrorValidator = (values) => { 
  return {
    prediction: !values.prediction ? 'Select a Prediction' : null
  };
};


class NewExpert extends Component {
  // TODO: Reuse this code better between this and AddExpertToItem
  constructor(props) {
    super()

    this.state = {
      expertAdded: false,
      createdExpert: null,
      expertErrorError: false,
      addExpertError: false,
      predictionAddedToExpert: false,
      addPredictionError: false,
      categories: [{ label: "Loading Categories...", value:"" }],
      claims: [{ label: "Loading Claims...", value: "" }],
      predictions: [{ label: "Loading Predictions...", value: "" }]
    }
  }


  resetNewExpert = () => {
    this.setState({
      expertAdded: false,
      createdExpert: null,
      expertError: false,
      addExpertError: false,
      predictionAddedToExpert: false,
      addPredictionError: false
    })
  }


  componentDidMount() {
    this.loadCategories()
    this.loadClaims()
    this.loadPredictions()
  }


  loadCategories() {
    // TODO: STICK THIS IN REDUX
    let params = {
      path: "categories",
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (result.error) {
        this.setState({ categories: [{ label: "Unable to Load Categories", value: "" }] })
      } else {
        const categories = result.map((item) => {
          return { label: item.name, value: item.id }
        })

        this.setState({ categories: categories })
      }
    }, 
    (reject) => {
      this.setState({ categories: [{ label: "Unable to Load Categories", value: "" }] })
    })
  }


  loadPredictions() {
    // TODO: STICK THIS IN REDUX
    let params = {
      path: "all_predictions",
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (result.error) {
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


  loadClaims() {
    // TODO: STICK THIS IN REDUX
    let params = {
      path: "all_claims",
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (result.error) {
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


  submitForm = (values, event, formApi) => {
    const { id, type } = this.props

    this.setState({ expertError: false })

    let params = {
      path: "create_expert",
      data: { 
        name: values.name,
        category: values.category,
        description: values.description,
        occupation: values.occupation,
        website: values.website,
        email: values.email,
        city: values.city,
        tags: values.tags,
        twitter: values.twitter,
        facebook: values.facebook,
        youtube: values.youtube,
        instagram: values.instagram,
        wikipedia: values.wikipedia
      },
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      console.log(result)
      if (!result) {
        this.setState({ expertError: true })
      } else if (result.error === true) {
        this.setState({ expertError: true })
      } else {
        formApi.setValue('title', null)
        formApi.setValue('description', null)
        formApi.setValue('url', null)
        formApi.setValue('category', null)
      
        this.setState({ expertAdded: true, createdExpert: result.expert })
      }
    }, 
    (reject) => {
      this.setState({ expertError: true })
    })
  }


  submitAddClaimOrPredictionToExpert = (values, event, formApi) => {
    const { id, type } = this.props
    console.log("submitting claims'")


    this.setState({ addPredictioError: false })
    // TODO FIX THIS
    let params = {
      path: "add_prediction_to_expert",
      path_variables: {
        expert_id: this.state.createdExpert.id
      },
      data: { 
        id: values.prediction,
      },
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      console.log("result1")
      console.log(result)
      if (!result) {
        this.setState({ addPredictionError: true })
      } else if (result.error === true) {
        this.setState({ addPredictionError: true })
      } else {
        formApi.setValue('expert', null)
        this.setState({ predictionAddedToExpert: true })
      }
    }, 
    (reject) => {
      this.setState({ addPredictionError: true })
    })
  }


  expertForm() {
    return <Form
      onSubmit={(submittedValues, event, formApi) => this.submitForm(submittedValues, event, formApi) }
      validateError={errorValidator}
      validateOnSubmit={"yes"}
      dontValidateOnMount={"yes"}>
      { formApi => (
        <form onSubmit={formApi.submitForm} id="form2">
          <div className="input-field">
            <label htmlFor="name">Expert Name</label>
            <Text field="name" id="name" placeholder="Enter Name" />
            <br/>
            {formApi.errors.name && <span className="input-error">{formApi.errors.name}</span>}
          </div>
          <div className="input-field">
          <label htmlFor="category">Category</label>
          <Select field="category" id="category" options={this.state.categories} />
          <br/>
          {formApi.errors.category && <span className="input-error">{formApi.errors.category}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <TextArea field="description" id="description" placeholder="Enter Description" />
            <br/>
            {formApi.errors.name && <span className="input-error">{formApi.errors.name}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="occupation">Occupation</label>
            <Text field="occupation" id="occupation" placeholder="Enter Occupation" />
            <br/>
            {formApi.errors.occupation && <span className="input-error">{formApi.errors.occupation}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="website">Website</label>
            <Text field="website" id="website" placeholder="Enter Website" />
            <br/>
            {formApi.errors.website && <span className="input-error">{formApi.errors.website}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <Text field="email" id="email" placeholder="Enter Email" />
            <br/>
            {formApi.errors.email && <span className="input-error">{formApi.errors.email}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="occupation">City</label>
            <Text field="city" id="city" placeholder="Enter City" />
            <br/>
            {formApi.errors.city && <span className="input-error">{formApi.errors.city}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="tags">Tags</label>
            <Text field="tags" id="tags" placeholder="Enter Tags" />
            <br/>
            {formApi.errors.tags && <span className="input-error">{formApi.errors.tags}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="twitter">Twitter</label>
            <Text field="twitter" id="twitter" placeholder="Enter Twitter" />
            <br/>
            {formApi.errors.twitter && <span className="input-error">{formApi.errors.twitter}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="facebook">Facebook</label>
            <Text field="facebook" id="facebook" placeholder="Enter Facebook" />
            <br/>
            {formApi.errors.facebook && <span className="input-error">{formApi.errors.facebook}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="youtube">Youtube</label>
            <Text field="youtube" id="youtube" placeholder="Enter Youtube" />
            <br/>
            {formApi.errors.youtube && <span className="input-error">{formApi.errors.youtube}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="instagram">Instagram</label>
            <Text field="instagram" id="instagram" placeholder="Enter Instagram" />
            <br/>
            {formApi.errors.instagram && <span className="input-error">{formApi.errors.instagram}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="wikipedia">Wikipedia</label>
            <Text field="wikipedia" id="wikipedia" placeholder="Enter Wikipedia" />
            <br/>
            {formApi.errors.wikipedia && <span className="input-error">{formApi.errors.wikipedia}</span>}
          </div>
          <button type="submit">add expert</button>
          {this.state.expertError &&
            <span className="input-error">Unable to post expert: please try again later.</span>
          }
        </form>
      )}
    </Form>
  }


  claimOrPredictionForm() {
    return <React.Fragment>
      <Form
        onSubmit={(submittedValues, event, formApi) => this.submitAddClaimOrPredictionToExpert(submittedValues, event, formApi) }
        validateError={expertErrorValidator}
        validateOnSubmit={"yes"}
        dontValidateOnMount={"yes"}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="form3">
            <div>Select a prediction to add to this expert.</div>
            <div className="input-field">
              <Select field="prediction" id="prediction" options={this.state.predictions} />
              <br/>
              {formApi.errors.prediction && <span className="input-error">{formApi.errors.prediction}</span>}
            </div>
            <button type="submit">attach prediction</button>
            {this.state.addExpertError &&
              <span className="input-error">Unable to connect expert to expert: please try again later.</span>
            }
            </form>
          )}
      </Form>
      <button onClick={this.resetNewExpert}>add new expert</button>
    </React.Fragment>
  }

  
  render () {
    return <div>
      <Header/>
      <div className="container">
        {this.state.expertAdded === false &&
          <Card title="enter info" dropDown={false}>
            {this.expertForm()}
          </Card>
        }
        {this.state.expertAdded === true &&
          <Card title="select expert" dropDown={false}>
            {this.state.predictionAddedToExpert === false &&
              <React.Fragment>
                <div>Know a claim that '{this.state.createdExpert.name}' is making? Select a claim or prediction below!</div>
                {this.claimOrPredictionForm()}
              </React.Fragment>
            }
            {this.state.predictionAddedToExpert === true &&
              <React.Fragment>
                <div>Success! You've added this item to your expert. Click below to add another expert.</div>
                <button onClick={this.resetNewExpert}>add new expert</button>
              </React.Fragment>
            }
          </Card>
        }
      </div>
      <Footer/>
    </div>

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewExpert);