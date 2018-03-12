import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Text, Select } from 'react-form';

import API from './../utilities/API'

import Header from './../components/Header'
import Footer from './../components/Footer'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const emailValidator = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


const errorValidator = (values) => {
  return {
    content: !values.first_name || values.first_name.trim() === '' ? 'First Name is Required' : null,
    content: !values.last_name || values.last_name.trim() === '' ? 'Last Name is Required' : null,
    content: !values.email || !emailValidator(values.email) ? 'Email is Required' : null,
    content: !values.notification_frequency ? 'Notification Frequency is Required' : null
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    user_edit: (ownProps) => dispatch({ 
      type: "USER_EDIT",
      value: ownProps
    })
  }
}


class EditProfile extends Component {
  constructor(props) {
    super()

    this.state = {
      updateError: false,
      updateSuccess: false,
      notification_frequencies: [
        { label: "As They Happen", value: "as_they_happen" },
        { label: "Daily Digests", value: "daily" },
        { label: "Weekly Digests", value: "weekly" },
        { label: "Monthly Digests", value: "monthly" },
        { label: "No Notifications", value: "none" }
      ]
    }
  }


  submitForm = (values, event, formApi) => {
    const { id, type, user_edit } = this.props

    this.setState({
      updateError: false,
      updateSuccess: false
    })

    let formData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      notification_frequency: values.notification_frequency
    }
    
    const avatar = document.getElementById("avatar")
    
    if (avatar.files[0]) {
      formData.avatar = avatar.files[0]
    }

    let params = {
      path: `update_user`,
      data: formData,
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (!result) {
        this.setState({ updateError: true })
      } else if (result.error === true) {
        this.setState({ updateError: true })
      } else {
        formApi.setValue('content', null)
        // UPDATE USER ATTRIBUTES?
        let user = result
        user.avatar_file_name = result.avatar
        user_edit(user)
        this.setState({ updateSuccess: true })
      }
    }, 
    (reject) => {
      this.setState({ updateError: true })
    })
  }


  editProfileForm() {
    const { first_name, last_name, email, notification_frequency, avatar_file_name } = this.props.user
    const { notification_frequencies } = this.state
    const formDefaults = { first_name: first_name, last_name: last_name, email: email, notification_frequency: notification_frequency }
  
    return <Form
      defaultValues={formDefaults}
      onSubmit={(submittedValues, event, formApi) => this.submitForm(submittedValues, event, formApi) }
      validateError={errorValidator}
      validateOnSubmit={"yes"}
      dontValidateOnMount={"yes"}>
      { formApi => (
        <form  onSubmit={formApi.submitForm} id="form2">
          <div>
            <Text field="first_name" id="first_name" placeholder="First Name" />
            <br/>
            {formApi.errors.first_name && <span className="error">{formApi.errors.first_name}</span>}
          </div>
          <br/><br/>
          <div>
            <Text field="last_name" id="last_name" placeholder="Last Name" />
            <br/>
            {formApi.errors.last_name && <span className="error">{formApi.errors.last_name}</span>}
          </div>
          <br/><br/>
          <div>
            <Text field="email" id="email" placeholder="Email" />
            <br/>
            {formApi.errors.email && <span className="error">{formApi.errors.email}</span>}
          </div>
          <br/><br/>
          <div>
            Notification Frequency:<br/>
            <Select field="notification_frequency" id="notification_frequency" options={notification_frequencies} />
            <br/>
            {formApi.errors.notification_frequency && <span className="error">{formApi.errors.notification_frequency}</span>}
          </div>
          <br/><br/>
          <div>
            Avatar:<br/>
            <input type="file" accept=".png,.jpeg,.jpg,.gif" field="avatar" id="avatar" />
            {(this.props.user.avatar_file_name && this.props.user.avatar_file_name.indexOf("http", 0) > -1) &&
              <div
                className="edit-profile__avatar"
                style={{backgroundImage: `url(${this.props.user.avatar_file_name})`}}
                ></div>
            }
          </div>          

          <button type="submit">Update</button>
          {this.state.updateError &&
            <span className="error">Unable to save updates; please try again</span>
          }
          {this.state.updateSuccess === true &&
            <span className="success">Your information has been updated!</span>
          }
        </form>
      )}
    </Form>
  }


  render () {
    const { match: { params }, user } = this.props;
    let avatar_file_name;
    if (user) {
      avatar_file_name = this.props.user.avatar_file_name;
    }

    return <div>
      <Header/>
      <div className="container">
        {!user &&
          <div>You must be logged in to view this page.</div>
        }
        {user && 
          <React.Fragment>
            <p>Update your info below and hit update to save.</p>

            {(avatar_file_name && avatar_file_name.indexOf("http", 0) > -1) &&
              this.editProfileForm()
            }
          </React.Fragment>
        }
      </div>
      <Footer/>
    </div>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);