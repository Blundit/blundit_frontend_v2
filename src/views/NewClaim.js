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
    category: !values.category ? 'Select a Category' : null
  };
};


const expertErrorValidator = (values) => { 
  return {
    expert: !values.expert ? 'Select an Expert' : null
  };
};


class NewClaim extends Component {
  // TODO: Reuse this code better between this and AddExpertToItem
  constructor(props) {
    super()

    this.state = {
      claimAdded: false,
      createdClaim: null,
      claimError: false,
      addExpertError: false,
      categories: [{ label: "Loading Categories...", value:"" }],
      experts: [{ label: "Loading Experts...", value:"" }]
    }
  }


  resetNewClaim = () => {
    this.setState({
      claimAdded: false,
      createdClaim: null,
      claimError: false,
      addExpertError: false
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

    this.setState({ claimError: false })

    let params = {
      path: "create_claim",
      data: { 
        title: values.title,
        description: values.description,
        url: values.url,
        category: values.category
      },
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (!result) {
        this.setState({ claimError: true })
      } else if (result.error === true) {
        this.setState({ claimError: true })
      } else {
        formApi.setValue('title', null)
        formApi.setValue('description', null)
        formApi.setValue('url', null)
        formApi.setValue('category', null)
      
        this.setState({ claimAdded: true, createdClaim: result.claim })
      }
    }, 
    (reject) => {
      this.setState({ claimError: true })
    })
  }


  submitAddExpertToClaim = (values, event, formApi) => {
    const { id, type } = this.props

    this.setState({ addExpertError: false })

    let params = {
      path: "add_expert_to_claim",
      path_variables: {
        claim_id: this.state.createdClaim.id
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
        this.setState({ expertAddedToClaim: true })
      }
    }, 
    (reject) => {
      this.setState({ addExpertError: true })
    })
  }


  claimForm() {
    return <Form
      onSubmit={(submittedValues, event, formApi) => this.submitForm(submittedValues, event, formApi) }
      validateError={errorValidator}
      validateOnSubmit={"yes"}
      dontValidateOnMount={"yes"}>
      { formApi => (
        <form onSubmit={formApi.submitForm} id="form2">
          <div className="input-field">
            <label htmlFor="title">Claim Title</label>
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
            <label htmlFor="category">Claim Category</label>
            <Select field="category" id="category" options={this.state.categories} />
            <br/>
            {formApi.errors.category && <span className="input-error">{formApi.errors.category}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="url">Claim Evidence</label>
            <Text field="url" id="url" placeholder="Enter URL" />
            <br/>
            {formApi.errors.url && <span className="input-error">{formApi.errors.url}</span>}
          </div>

          <button type="submit">add claim</button>
          {this.state.claimError &&
            <span className="input-error">Unable to post comment: please try again later.</span>
          }
        </form>
      )}
    </Form>
  }


  expertForm() {
    return <React.Fragment>
      <Form
        onSubmit={(submittedValues, event, formApi) => this.submitAddExpertToClaim(submittedValues, event, formApi) }
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
              <span className="input-error">Unable to connect expert to claim: please try again later.</span>
            }
            </form>
          )}
      </Form>
      <button onClick={this.resetNewClaim}>add new claim</button>
    </React.Fragment>
  }

  
  render () {
    return <div>
      <Header/>
      <div className="container">
        {this.state.claimAdded == false &&
          <Card title="enter info" dropDown={false}>
            {this.claimForm()}
          </Card>
        }
        {this.state.claimAdded === true &&
          <Card title="select expert" dropDown={false}>
            {this.state.expertAddedToClaim === false &&
              <React.Fragment>
                <div>No someone who's making the claim '{this.state.createdClaim.title}'? Select an Expert below!</div>
                {this.expertForm()}
              </React.Fragment>
            }
            {this.state.expertAddedToClaim === true &&
              <React.Fragment>
                <div>Success! You've added this expert to your claim. Click below to add another claim.</div>
                <button onClick={this.resetNewClaim}>add new claim</button>
              </React.Fragment>
            }
          </Card>
        }
      </div>
      <Footer/>
    </div>

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewClaim);