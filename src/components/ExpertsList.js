import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

import ExpertsListItem from './ExpertsListItem'

class ExpertsList extends Component {
  render() {
    const { type, experts } = this.props

    return <Card title={`experts who ${type}`}>
      <div className="experts-list">
        <div className="experts-list__items">
          {experts.length === 0 && 
            <div className="experts-list__items--empty">{`No experts ${type} with this.`}</div>
          }
          {experts.map((item) => {
            <ExpertsListItem item={item} />
          })}
        </div>
      </div>
    </Card>
  }
}

export default ExpertsList