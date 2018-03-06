import React, { Component } from 'react'
import API from './../utilities/API'
import { Link, Redirect } from 'react-router-dom'


class HomeSearch extends Component {
  keyPressHandler = (event) => {
    if (event.key === "Enter") {
      this.submitSearch()
    }
  }


  submitSearch () {
    const query = document.getElementById('home-search-input').value
    window.location = "/search?search=" + encodeURIComponent(query)
  }


  render() {
    const { claims } = this.props;

    return <div className="home-search--wrapper">
      <div className="home-search">
        <input 
          type="text"
          className="home-search__text"
          id="home-search-input"
          placeholder="Search for an expert, claim or prediction!" 
          onKeyPress={this.keyPressHandler} />
        <div className="home-search__button" onClick={this.submitSearch}><span className="fas fa-search" /></div>
      </div>
    </div>

  }
}

export default HomeSearch;