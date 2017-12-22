import React, { Component } from 'react';
import Header from './components/Header';
import Store from './Store';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          Stuff will go here, y'all.
        </p>
      </div>
    );
  }
}

export default App;
