import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookmarkDisplay from './BookmarkDisplay'
import CardHeader from './CardHeader'

class ClaimHeader extends Component {

  render() {
    const { claim, toggleBookmark } = this.props

    return <CardHeader title={claim.title}>
      <div className="claim-header__status">{claim.status}</div>
    </CardHeader>
  }
}

export default ClaimHeader