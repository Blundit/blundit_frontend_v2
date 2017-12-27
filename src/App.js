import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Header from './components/Header';
import Login from './views/Login';

import store from './Store';

import { Provider } from 'react-redux';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
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
  </div>
)

const NotFound = () => (
  <div>
    <h1>404'ed</h1>
    <Header/>
  </div>
)




export default App;
