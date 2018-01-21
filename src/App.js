import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Sessions from './utilities/Sessions'
import store from './Store'
import { Provider } from 'react-redux'

import Header from './components/Header'
import Footer from './components/Footer'

import Login from './views/Login'
import Logout from './views/Logout'
import Register from './views/Register'
import Claims from './views/Claims'
import Predictions from './views/Predictions'
import Experts from './views/Experts'


class Blundit extends Component {
  componentDidMount() {
    Sessions.verifyUserToken(store)
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={Register} />
              <Route path="/claims" component={Claims} />
              <Route path="/predictions" component={Predictions} />
              <Route path="/experts" component={Experts} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

const Home = () => (
  <div>
    <h1>Home</h1>
    <Header/>
    Welcome!
    <Footer/>
  </div>
)

const NotFound = () => (
  <div>
    <h1>404'ed!</h1>
    <Header/>
    No content, bruh.
    <Footer/>

  </div>
)




export default Blundit