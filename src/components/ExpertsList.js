import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ExpertsListItem from './ExpertsListItem'

class ExpertsList extends Component {
  render() {
    const { type, experts } = this.props

    return <div className="experts-list">
      <div className="experts-list__title">{`Experts who ${type}`}</div>
      <div className="experts-list__items">
        {experts.map((item) => {
          <ExpertsListItem item={item} />
        })}
      </div>
    </div>
  }
}

export default ExpertsList