import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

import ExpertsListItem from './ExpertsListItem'

class ExpertsList extends Component {
  render() {
    const { type, experts } = this.props
    let icon

    // TODO: Remove this once the expert agrees/disagrees bit is in place
    let filtered_experts = experts.filter((element) => element.position === type || !element.position)
    // let filtered_experts = this.props.experts

    if (type === "agree") {
      icon = <span className="icon--success fa fa-user-circle" />
    } else {
      icon = <span className="icon--error fa fa-user-circle" />
    }

    return <Card icon={icon} title={`experts who ${type} (${filtered_experts.length})`}>
      <div className="experts-list">
        <div className="experts-list__items">
          {filtered_experts.length === 0 && 
            <div className="experts-list__items--empty">{`No experts ${type} with this.`}</div>
          }
          {filtered_experts.map((item, index) => {
            return <ExpertsListItem item={item} key={`experts_list_${type}_${index}`} />
          })}
        </div>
      </div>
    </Card>
  }
}

export default ExpertsList