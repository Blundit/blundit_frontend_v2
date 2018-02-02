import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookmarkDisplay from './BookmarkDisplay'
import CardHeader from './CardHeader'

class ClaimHeader extends Component {

  render() {
    const { claim, toggleBookmark } = this.props

    return <CardHeader>
      <div className="claim-header">
        <div className="claim-header__title">{claim.title}</div>
        <BookmarkDisplay bookmark={claim.bookmark} toggleBookmark={toggleBookmark} />
        <div className="claim-header__status">{claim.status}</div>
      </div>
    </CardHeader>
  }
}

export default ClaimHeader