import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

import ExpertsListItem from './ExpertsListItem'

class ExpertsList extends Component {
  render() {
    const { type } = this.props

    // TODO: REMOVE DUMMY EXPERTS
    let experts = [
      { alias: "random-guy", name: "Random Guy", position: "agree", job: "Guy", company: "Corp", rating: Math.random()*100, avatar: "https://fast-earth-30912.herokuapp.com/images/expert_avatars/default.png" },
      { alias: "random-gal", name: "Random Gal", position: "agree", job: "Gal", company: "Corp", rating: Math.random()*100, avatar: "https://fast-earth-30912.herokuapp.com/images/expert_avatars/default.png" },
      { alias: "bob-dean", name: "Bob Dean", position: "disagree", job: "Dude, Host", company: "", rating: Math.random()*100, avatar: "https://fast-earth-30912.herokuapp.com/images/expert_avatars/default.png" },
      { alias: "cranky-joe", name: "Cranky Joe", position: "disagree", job: "Dude, Host", company: "", rating: Math.random()*100, avatar: "https://fast-earth-30912.herokuapp.com/images/expert_avatars/default.png" },
    ]

    let filtered_experts = experts.filter((element) => element.position === type)

    return <Card title={`experts who ${type} (${filtered_experts.length})`}>
      <div className="experts-list">
        <div className="experts-list__items">
          {experts.length === 0 && 
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