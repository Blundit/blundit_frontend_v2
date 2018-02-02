import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

class VoteForItem extends Component {
  render() {
    const { type, processVote, claim } = this.props

    return <Card title="vote">
      <div className={`${type}-vote`}>
        Vote Stuff here
      </div>
    </Card>
  }
}

export default VoteForItem