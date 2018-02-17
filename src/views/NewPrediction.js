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
    title: !values.title || values.title.trim() === '' ? 'Please enter a title' : null,
    description: !values.description || values.description.trim() === '' ? 'Please enter a description' : null,
    url: !values.url || values.url.trim() === '' ? 'Please enter a URL' : null,
    category: !values.category ? 'Select a Category' : null,
    prediction_date: !values.prediction_date || values.prediction_date.trim() === '' ? 'Please enter a prediction date' : null
  };
};


const expertErrorValidator = (values) => { 
  return {
    expert: !values.expert ? 'Select an Expert' : null
  };
};


class NewPrediction extends Component {
  // TODO: Reuse this code better between this and AddExpertToItem
  constructor(props) {
    super()

    this.state = {
      predictionAdded: false,
      createdPrediction: null,
      predictionErrorError: false,
      addExpertError: false,
      expertAddedToPrediction: false,
      categories: [{ label: "Loading Categories...", value:"" }],
      experts: [{ label: "Loading Experts...", value:"" }]
    }
  }


  resetNewPrediction = () => {
    this.setState({
      predictionAdded: false,
      createdPrediction: null,
      predictionError: false,
      addExpertError: false,
      expertAddedToPrediction: false
    })
  }


  componentDidMount() {
    this.loadCategories()
    this.loadExperts()
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


  loadExperts() {
    // TODO: STICK THIS IN REDUX
    let params = {
      path: "all_experts",
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (result.error) {
        this.setState({ experts: [{ label: "Unable to Load Experts", value: "" }] })
      } else {
        const experts = result.map((item) => {
          return { label: item.title, value: item.id }
        })

        this.setState({ experts: experts })
      }
    }, 
    (reject) => {
      this.setState({ experts: [{ label: "Unable to Load Experts", value: "" }] })
    })
  }


  submitForm = (values, event, formApi) => {
    const { id, type } = this.props

    this.setState({ predictionError: false })

    let params = {
      path: "create_prediction",
      data: { 
        title: values.title,
        description: values.description,
        url: values.url,
        category: values.category,
        prediction_date: values.prediction_date
      },
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (!result) {
        this.setState({ predictionError: true })
      } else if (result.error === true) {
        this.setState({ predictionError: true })
      } else {
        formApi.setValue('title', null)
        formApi.setValue('description', null)
        formApi.setValue('url', null)
        formApi.setValue('category', null)
      
        this.setState({ predictionAdded: true, createdPrediction: result.prediction })
      }
    }, 
    (reject) => {
      this.setState({ predictionError: true })
    })
  }


  submitAddExpertToPrediction = (values, event, formApi) => {
    const { id, type } = this.props

    this.setState({ addExpertError: false })

    let params = {
      path: "add_expert_to_prediction",
      path_variables: {
        prediction_id: this.state.createdPrediction.id
      },
      data: { 
        id: values.expert,
      },
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (!result) {
        this.setState({ addExpertError: true })
      } else if (result.error === true) {
        this.setState({ addExpertError: true })
      } else {
        formApi.setValue('expert', null)
        this.setState({ expertAddedToPrediction: true })
      }
    }, 
    (reject) => {
      this.setState({ addExpertError: true })
    })
  }


  predictionForm() {
    return <Form
      onSubmit={(submittedValues, event, formApi) => this.submitForm(submittedValues, event, formApi) }
      validateError={errorValidator}
      validateOnSubmit={"yes"}
      dontValidateOnMount={"yes"}>
      { formApi => (
        <form onSubmit={formApi.submitForm} id="form2">
          <div className="input-field">
            <label htmlFor="title">Prediction Title</label>
            <Text field="title" id="title" placeholder="Enter Title" />
            <br/>
            {formApi.errors.title && <span className="input-error">{formApi.errors.title}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <TextArea field="description" id="description" placeholder="Enter Description" />
            <br/>
            {formApi.errors.description && <span className="input-error">{formApi.errors.description}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="category">Prediction Category</label>
            <Select field="category" id="category" options={this.state.categories} />
            <br/>
            {formApi.errors.category && <span className="input-error">{formApi.errors.category}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="prediction_date">Prediction Date</label>
            <Text field="prediction_date" id="prediction_date" placeholder="Enter Come-True Date For This Prediction" />
            <br/>
            {formApi.errors.prediction_date && <span className="input-error">{formApi.errors.prediction_date}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="url">Prediction Evidence</label>
            <Text field="url" id="url" placeholder="Enter URL" />
            <br/>
            {formApi.errors.url && <span className="input-error">{formApi.errors.url}</span>}
          </div>

          <button type="submit">add prediction</button>
          {this.state.predictionError &&
            <span className="input-error">Unable to post comment: please try again later.</span>
          }
        </form>
      )}
    </Form>
  }


  expertForm() {
    return <React.Fragment>
      <Form
        onSubmit={(submittedValues, event, formApi) => this.submitAddExpertToPrediction(submittedValues, event, formApi) }
        validateError={expertErrorValidator}
        validateOnSubmit={"yes"}
        dontValidateOnMount={"yes"}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="form3">
            <div className="input-field">
              <Select field="expert" id="expert" options={this.state.experts} />
              <br/>
              {formApi.errors.experts && <span className="input-error">{formApi.errors.experts}</span>}
            </div>
            <button type="submit">attach expert</button>
            {this.state.addExpertError &&
              <span className="input-error">Unable to connect expert to prediction: please try again later.</span>
            }
            </form>
          )}
      </Form>
      <button onClick={this.resetNewPrediction}>add new prediction</button>
    </React.Fragment>
  }

  
  render () {
    return <div>
      <Header/>
      <div className="container">
        {this.state.predictionAdded === false &&
          <Card title="enter info" dropDown={false}>
            {this.predictionForm()}
          </Card>
        }
        {this.state.predictionAdded === true &&
          <Card title="select expert" dropDown={false}>
            {this.state.expertAddedToPrediction}
            {this.state.expertAddedToPrediction === false &&
              <React.Fragment>
                <div>Know someone who's making the prediction '{this.state.createdPrediction.title}'? Select an Expert below!</div>
                {this.expertForm()}
              </React.Fragment>
            }
            {this.state.expertAddedToPrediction === true &&
              <React.Fragment>
                <div>Success! You've added this expert to your prediction. Click below to add another prediction.</div>
                <button onClick={this.resetNewPrediction}>add new prediction</button>
              </React.Fragment>
            }
          </Card>
        }
      </div>
      <Footer/>
    </div>

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewPrediction);