import React, { Component } from 'react';
import Header from './components/Header';
import store from './Store';

import { Provider } from 'react-redux';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <p className="App-intro">
            Stuff will go here, y'all.
          </p>
        </div>
      </Provider>
    );
  }
}

export default App;
