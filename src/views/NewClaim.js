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
    set_claim_list: (ownProps) => dispatch({ 
      type: "SET_CLAIM_LIST",
      value: ownProps
    })
  }
}


const errorValidator = (values) => { 
  console.log(values)
  return {
    title: !values.title || values.title.trim() === '' ? 'Please enter a title' : null,
    description: !values.description || values.description.trim() === '' ? 'Please enter a description' : null,
    url: !values.url || values.url.trim() === '' ? 'Please enter a URL' : null,
    category: !values.category ? 'Select a Category' : null
  };
};


class NewClaim extends Component {
  constructor(props) {
    super()

    this.state = {
      claimAdded: false,
      claimError: false,
      categories: [{ label: "Loading Categories...", value:"" }]
    }
  }

  componentDidMount() {
    this.loadCategories()
  }


  loadCategories() {
    // TODO: STICK THIS IN REDUX
    let params = {
      path: "categories",
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors

      const categories = result.map((item) => {
        return { label: item.name, value: item.id }
      })

      this.setState({ categories: categories })
    }, 
    (reject) => {
      this.setState({ categories: [{ label: "Unable to Load Categories", value: "" }] })
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
      
        this.setState({ claimAdded: true })
      }
    }, 
    (reject) => {
      this.setState({ claimError: true })
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
            <React.Fragment>
              <div>You've added a claim! Add expert to it!</div>
              <div>FUNCTIONALITY UPCOMING</div>
            </React.Fragment>
          </Card>
        }
      </div>
      <Footer/>
    </div>

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewClaim);