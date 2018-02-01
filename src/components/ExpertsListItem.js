import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ExpertsListItem extends Component {
  render() {
    const { item } = this.props

    return <div className="experts-list__item">
      <Link to={`/experts/${item.alias}`}>
      <div className="experts-list__item-avatar">PIC</div>
      <div className="experts-list__item-name">NAME</div>
      <div className="experts-list__item-rating">RATiNG</div>
      </Link>
    </div>
  }
}

export default ExpertsListItem