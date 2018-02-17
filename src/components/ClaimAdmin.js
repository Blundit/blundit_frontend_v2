import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from './../utilities/API'

import { Form, TextArea, Select } from 'react-form'

import Card from './Card'

const adminValidator = (values) => { 
  return {
    vote_value: !values.vote_value ? 'Enter an override value' : null,
    reason: !values.reason ? 'Select a Claim' : null
  };
};


class ClaimAdmin extends Component {
  constructor() {
    super()
    // TODO: Update this to allow for an 'unknown' voting state.
    this.state = {
      adminError: false,
      voteOverrideValues: [{ label: "Select a Vote Value", value:"" }, { label: "True", value:"1" }, { label: "False", value:"0" } ]
    }
  }


  submitAdmin = (values, event, formApi) => {
    const { id, type, updatedClaim } = this.props

    this.setState({ adminError: false })


    let params = {
      path: "claim_override_vote",
      path_variables: {
        claim_id: id,
      },
      data: { 
        vote_value: values.vote_value,
        reason: values.reason
      },
    }

    API.do(params).then((result) => {
      if (!result) {
        this.setState({ adminError: true })
      } else if (result.error === true) {
        this.setState({ adminError: true })
      } else {
        formApi.setValue('reason', null)
        formApi.setValue('vote_value', null)

        this.setState({ adminUpdated: true })

        updatedClaim()
      }
    }, 
    (reject) => {
      this.setState({ adminError: true })
    })
  }



  render() {
    const { updatedClaim } = this.props
    const icon = <span className="fas fa-lock" />
    return <Card title="Admin" icon={icon}>
      <div className="card__admin-title">
      <Form
      onSubmit={(submittedValues, event, formApi) => this.submitAdmin(submittedValues, event, formApi) }
      validateError={adminValidator}
      validateOnSubmit={"yes"}
      dontValidateOnMount={"yes"}>
      { formApi => (
        <form onSubmit={formApi.submitForm} id="form">
          <div className="input-field">
            <Select field="vote_value" id="vote_value" options={this.state.voteOverrideValues} />
            <br/>
            {formApi.errors.vote_value && <span className="input-error">{formApi.errors.vote_value}</span>}
          </div>
          <div className="input-field">
            <TextArea field="reason" id="reason" placeholder="Reason" />
            <br/>
            {formApi.errors.reason && <span className="input-error">{formApi.errors.vote_value}</span>}
          </div>
          <button type="submit">Override Vote</button>
          {this.state.adminError &&
            <span className="input-error">Unable to override vote: please try again later.</span>
          }
          </form>
        )}
    </Form>
    {this.state.claimAddedToExpert === true &&
      <React.Fragment>
        <div>Success! You've added this claim. Feel free to continue to add more experts.</div>
      </React.Fragment>
    }
      </div>
    </Card>
  }
}

export default ClaimAdmin