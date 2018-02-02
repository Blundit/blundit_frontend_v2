import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

class VoteForItem extends Component {
  render() {
    const { type, processVote, claim } = this.props
    const icon = <span className="fas fa-pen-square" />
    return <Card title="vote" icon={icon}>
      <div className={`${type}-vote`}>
        Vote Stuff here
      </div>
    </Card>
  }
}

export default VoteForItem