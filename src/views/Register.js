import React, { Component } from 'react'
import Header from './../components/Header'
import API from './../utilities/API'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Text } from 'react-form';

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    register: (ownProps) => dispatch({ 
      type: "USER_LOGIN",
      value: ownProps
    })
  }
}


const errorValidator = (values) => { 
  return {
    email: !values.email || values.email.trim() === '' || values.email.length < 6 ? 'Email is a required field' : null,
    password: !values.password || values.password.trim() == '' ? 'Password required' : null,
    password_confirmation: values.password != values.password_confirmation ? 'Password and Password Confirmation must match' : null
  };
};


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registerError: false
    }
  }
  
  render() {
    const { user } = this.props

    return <div>
      <h1>
        Register
        </h1>
      <Header/>
      <div>
        <div>{this.state.email}</div>
        {(!user || !user.id) && 
          this.registerForm()
        }
        {user && user.id &&
          <React.Fragment>
            <div>You're already logged in, so you can't register.</div>
            <Link to="/logout">Logout</Link>
          </React.Fragment>
        }
      </div>
    </div>
  }

    

    // TODO: PUT LOGOUT SOMEWHERE ELSE
    //   logout = (token, success = null, error = null) => {
    //     if (!token) {
    //       return { errors: ["user_token_required"] }
    //     }
    
    //     let params = { path: "logout" }
    //     return API.do(params).then(function(result) {
    //       Sessions.clearUser()
    //     }, 
    //     function(error) {
    //       console.log(error)
    //     });
    //   }


  submitForm = (value) => {
    this.setState({ registerError: false })
    let params = {
      path: "register",
      data: { email: value.email, password: value.password, password_confirmation: value.password_confirmation },
    }

    API.do(params).then((result) => {
      if (result.error == true) {
        this.setState({registerError: true})
      } else {
        this.props.register(result)
      }
    }, 
    (reject) => {
      console.error("problem registering");
      this.setState({registerError: true})
    })
  }


  registerForm() {
    return <React.Fragment>
      <Form
        onSubmit={submittedValues => this.submitForm(submittedValues) }
        validateError={errorValidator}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="form2">
            <div>
              <label htmlFor="email">Email</label>
              <Text field="email" id="email" />
              <br/>
              {formApi.errors.email && <span className="error">{formApi.errors.email}</span>}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Text type="password" field="password" id="password" />
              <br/>
              {formApi.errors.password && <span className="error">{formApi.errors.password}</span>}
              <br/>
            </div>
            <div>
              <label htmlFor="password">Password Confirmation</label>
              <Text type="password" field="password_confirmation" id="password_confirmation" />
              <br/>
              {formApi.errors.password_confirmation && <span className="error">{formApi.errors.password_confirmation}</span>}
              <br/>
            </div>
            <button type="submit">Register</button>
            {this.state.registerError &&
              <div className="error">ERROR!</div>
            }
          </form>
        )}
      </Form>
    </React.Fragment>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);