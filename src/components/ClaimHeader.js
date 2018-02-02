import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookmarkDisplay from './BookmarkDisplay'
import CardHeader from './CardHeader'
import CategoryImages from './../utilities/CategoryImages'

class ClaimHeader extends Component {
  // TODO: ABSTRACT FORMAT STATUS TEXT CALLS 
  // INTO SITE-WIDE UTILS

  formatStatusText = status => {
    if (!status) status = "unknown"
    const statuses = { 
      "unknown": "the truth of this claim is unknown",
      "in-progress": "voting in progress",
      "true": "this claim is true",
      "false": "this claim is false",
    }

    return statuses[status].toUpperCase()
  }


  validStatusType = status => {
    if (!status) status = "unknown"

    const valid = ["unknown", "in-progress", "true", "false"].find((element) => element === status)
    if (valid) return status
  }


  getStatusIcon = status => {
    if (!status) status = "unknown"
    const statuses = { 
      "unknown": "fas fa-question",
      "in-progress": "far fa-ellipsis-h",
      "true": "fas fa-check",
      "false": "fas fa-times",
    }

    return statuses[status]
  }


  getStatusClass = status => {
    if (!status) status = "unknown"
    
    return "card-header__status-bar--" + status
  }


  render() {
    const { claim, toggleBookmark } = this.props
    const status = <span className={`card-header__status--${this.validStatusType(claim.status)}`}><span className={this.getStatusIcon(claim.status)}></span></span>

    return <CardHeader
      title={claim.title}
      status={status}
      toggleBookmark={toggleBookmark}
      bookmark={claim.bookmark}
      categories={claim.categories}
      bg={CategoryImages.get(claim.categories[0].id)}
      statusBar={this.validStatusType(claim.status) && <div className={this.getStatusClass(claim.status)}>{this.formatStatusText(claim.status)}</div>}
      >
      {claim.description ? claim.description : "Lorem ipsum dolor sit amet"}
    </CardHeader>
  }
}

export default ClaimHeader