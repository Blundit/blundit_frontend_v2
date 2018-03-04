import React, { Component } from 'react'
import API from './../utilities/API'
import URL from './../utilities/URL'
import { Link, Redirect } from 'react-router-dom'


class InsideSearch extends Component {
  keyPressHandler = (event) => {
    if (event.key === "Enter") {
      this.submitSearch()
    }
  }


  submitSearch () {
    const query = document.getElementById('inside-search-input').value
    this.props.updateSearch(query)
  }


  render() {
    const { claims } = this.props;

    return <div className="inside-search--wrapper">
      <div className="inside-search">
        <input 
          type="text"
          className="inside-search__text"
          id="inside-search-input"
          defaultValue={URL.pathParam('search', null)}
          placeholder={`Search for ${this.props.type}s`} 
          onKeyPress={this.keyPressHandler} />
        <div className="inside-search__button" onClick={this.submitSearch}><span className="fas fa-search" /></div>
      </div>
    </div>
  }
}

export default InsideSearch;