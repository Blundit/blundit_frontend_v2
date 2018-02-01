import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class VoteForItem extends Component {
  render() {
    const { type, processVote, claim } = this.props

    return <div className={`${type}-vote`}>
      Vote Stuff here
    </div>
  }
}

export default VoteForItem