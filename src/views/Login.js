import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
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
  return {
    login: (ownProps) => dispatch({ 
      type: "USER_LOGIN",
      value: ownProps
    })
  }
}


const errorValidator = (values) => { 
  return {
    email: !values.email || values.email.trim() === '' || values.email.length < 6 ? 'Email is a required field' : null,
    password: !values.password || values.password.trim() === '' ? 'Password required' : null
  };
};


class Login extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loginError: false
    }
  }
  
  render() {
    const { user } = this.props

    return <div>
      <h1>
        Login
        </h1>
      <Header/>
      <div>
        <div>{this.state.email}</div>
        {(!user || !user.id) && 
          this.loginForm()
        }
        {user && user.id &&
          <React.Fragment>
            <div>You're already logged in.</div>
            <Link to="/logout">Logout</Link>
          </React.Fragment>
        }
      </div>
      <Footer/>
    </div>
  }


  submitForm = (value) => {
    this.setState({ loginError: false })
    let params = {
      path: "login",
      data: { email: value.email, password: value.password },
    }

    const { login } = this.props;

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (!result) {
        this.setState({ loginError: true })
      } else if (result.error === true) {
        console.error("Problem logging in");
        this.setState({loginError: true})
      } else {
        login(result)
      }
    }, 
    (reject) => {
      console.error("problem logging in");
      this.setState({loginError: true})
    })
  }


  loginForm() {
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
            <button type="submit">Submit</button>
            {this.state.loginError &&
              <div className="error">ERROR!</div>
            }
          </form>
        )}
      </Form>
      <div>Don't have an account? <Link to="/register">Click here to register.</Link></div>
    </React.Fragment>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);