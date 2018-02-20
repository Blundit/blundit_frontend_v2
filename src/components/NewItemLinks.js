import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class NewItemLinks extends Component {

  render() {
    const { claims } = this.props;

    return <div>
      <div className="recents">
        <div className="recents__header">
          <div className="recents__header-title">New Items</div>
          <div className="recents__header-filter"></div>
        </div>
        <div className="recents__items">
          Links to create new items go here, if user is logged in.
        </div>
      </div>
    </div>

  }
}

export default NewItemLinks