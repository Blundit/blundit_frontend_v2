import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ClaimsListItem extends Component {
  render() {
    const { item } = this.props

    return <div className="claims-list__item">
      <Link to={`/claims/${item.alias}`}>
        {item.title}
      </Link>
    </div>
  }
}

export default ClaimsListItem