import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PredictionsListItem extends Component {
  render() {
    const { item } = this.props

    return <div className="predictions-list__item">
      <Link to={`/predictions/${item.alias}`}>
        {item.title}
      </Link>
    </div>
  }
}

export default PredictionsListItem