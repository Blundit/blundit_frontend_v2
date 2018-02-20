import React, { Component } from 'react'
import API from './../utilities/API'
import { Link } from 'react-router-dom'


class HomeSearch extends Component {
  render() {
    const { claims } = this.props;

    return <div>
      <div className="recents">
        <div className="recents__header">
          <div className="recents__header-title">Search</div>
          <div className="recents__header-filter"></div>
        </div>
        <div className="recents__items">
          Search field.
        </div>
      </div>
    </div>

  }
}

export default HomeSearch;