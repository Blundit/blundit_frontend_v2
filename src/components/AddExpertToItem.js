import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from './../utilities/API'

import { Form, TextArea, Text, Select } from 'react-form'

import Card from './Card'

const expertErrorValidator = (values) => { 
  return {
    expert: !values.expert ? 'Select an Expert' : null
  };
};


class AddExpertToItem extends Component {
  constructor(props) {
    super()

    this.state = {
      addExpertError: false,
      categories: [{ label: "Loading Categories...", value:"" }],
      experts: [{ label: "Loading Experts...", value:"" }]
    }
  }


  componentDidMount() {
    this.loadExperts()
  }


  loadExperts() {
    // TODO: STICK THIS IN REDUX
    let params = {
      path: "all_experts",
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      console.log(result)
      if (result.error === true) {
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


  submitAddExpertToItem = (values, event, formApi) => {
    const { id, type, itemAdded } = this.props
    console.log(this.props)

    this.setState({ addExpertError: false })

    let params = {
      path: `add_expert_to_${type}`,
      path_variables: {
        claim_id: id,
        prediction_id: id
      },
      data: { 
        id: values.expert,
      },
    }

    API.do(params).then((result) => {
      if (!result) {
        this.setState({ addExpertError: true })
      } else if (result.error === true) {
        this.setState({ addExpertError: true })
      } else {
        formApi.setValue('expert', null)
        this.setState({ expertAddedToItem: true })

        itemAdded()
      }
    }, 
    (reject) => {
      this.setState({ addExpertError: true })
    })
  }


  expertForm() {
    const { type } = this.props
    return <React.Fragment>
      <Form
        onSubmit={(submittedValues, event, formApi) => this.submitAddExpertToItem(submittedValues, event, formApi) }
        validateError={expertErrorValidator}
        validateOnSubmit={"yes"}
        dontValidateOnMount={"yes"}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="form3">
            <div className="input-field">
              <Select field="expert" id="expert" options={this.state.experts} />
              <br/>
              {formApi.errors.expert && <span className="input-error">{formApi.errors.expert}</span>}
            </div>
            <button type="submit">attach expert</button>
            {this.state.addExpertError &&
              <span className="input-error">Unable to connect expert to {type}: please try again later.</span>
            }
            </form>
          )}
      </Form>
    </React.Fragment>
  }


  render() {
    const { type, addExpert } = this.props
    const icon = <span className="fas fa-user-plus" />
    
    return <Card title="add expert" icon={icon}>
      <div className="add-expert-to-item">
        {this.expertForm()}
        {this.state.expertAddedToItem === true &&
          <React.Fragment>
            <div>Success! You've added this expert to your {type}. Feel free to continue to add more experts.</div>
          </React.Fragment>
        }
      </div>
    </Card>
  }
}

export default AddExpertToItem