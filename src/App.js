import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Sessions from './utilities/Sessions'
import store from './Store'
import { Provider } from 'react-redux'

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
import About from './views/About'
import Contact from './views/Contact'
import Home from './views/Home'
import Search from './views/Search'
import Categories from './views/Categories'
import NotFound from './views/NotFound'
import Bookmarks from './views/Bookmarks'
import EditProfile from './views/EditProfile'
import PrivacyPolicy from './views/PrivacyPolicy'


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
              <Route exact path="/experts" component={Experts} />
              <Route exact path="/experts/new" component={NewExpert} />
              <Route path="/experts/:slug" component={Expert} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/search" component={Search} />
              <Route exact path="/categories" component={Categories} />
              <Route path="/categories/:category" component={Categories} />
              <Route path="/bookmarks" component={Bookmarks} />
              <Route path="/me" component={EditProfile} />
              <Route path="/privacy_policy" component={PrivacyPolicy} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default Blundit