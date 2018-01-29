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
import Claim from './views/Claim'
import NewClaim from './views/NewClaim'
import Predictions from './views/Predictions'
import Prediction from './views/Prediction'
import NewPrediction from './views/NewPrediction'
import Experts from './views/Experts'
import Expert from './views/Expert'
import NewExpert from './views/NewExpert'


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
              <Route exact path="/claims" component={Claims} />
              <Route exact path="/claims/new" component={NewClaim} />
              <Route path="/claims/:slug" component={Claim} />
              <Route exact path="/predictions" component={Predictions} />
              <Route exact path="/predictions/new" component={NewPrediction} />
              <Route path="/predictions/:slug" component={Prediction} />
              <Route expert path="/experts" component={Experts} />
              <Route expert path="/experts/new" component={NewExpert} />
              <Route path="/experts/:slug" component={Expert} />
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
    <Header/>
    Welcome!
    <Footer/>
  </div>
)

const NotFound = () => (
  <div>
    <Header/>
    <h1>404'ed!</h1>
    No content, bruh.
    <Footer/>

  </div>
)




export default Blundit