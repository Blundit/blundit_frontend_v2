import React, { Component } from 'react'
import API from './../utilities/API'
import { Link, Redirect } from 'react-router-dom'


class InsideSearch extends Component {
  keyPressHandler = (event) => {
    if (event.key === "Enter") {
      this.submitSearch()
    }
  }


  submitSearch () {
    const query = document.getElementById('inside-search-input').value
    window.location = "/search?query=" + encodeURIComponent(query)
  }


  render() {
    const { claims } = this.props;

    return <div className="inside-search--wrapper">
      <div className="inside-search">
        <input 
          type="text"
          className="inside-search__text"
          id="inside-search-input"
          placeholder="Search for an expert, claim or prediction!" 
          onKeyPress={this.keyPressHandler} />
        <div className="inside-search__button" onClick={this.submitSearch}><span className="fas fa-search" /></div>
      </div>
    </div>
  }
}

export default InsideSearch;