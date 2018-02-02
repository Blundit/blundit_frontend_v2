import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookmarkDisplay from './BookmarkDisplay'
import CardHeader from './CardHeader'
import CategoryImages from './../utilities/CategoryImages'

class PredictionHeader extends Component {
  // TODO: ABSTRACT FORMAT STATUS TEXT CALLS 
  // INTO SITE-WIDE UTILS

  formatStatusText = status => {
    if (!status) status = "unknown"
    const statuses = { 
      "unknown": "the truth of this prediction is unknown",
      "in-progress": "voting in progress",
      "true": "this prediction was right",
      "false": "this prediction was wrong",
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
    const { prediction, toggleBookmark } = this.props
    const status = <span className={`card-header__status--${this.validStatusType(prediction.status)}`}><span className={this.getStatusIcon(prediction.status)}></span></span>
    return <CardHeader
      title={prediction.title}
      status={status}
      toggleBookmark={toggleBookmark}
      bookmark={prediction.bookmark}
      categories={prediction.categories}
      bg={CategoryImages.get(prediction.categories[0].id)}
      statusBar={this.validStatusType(prediction.status) && <div className={this.getStatusClass(prediction.status)}>{this.formatStatusText(prediction.status)}</div>}
      >
      {prediction.description ? prediction.description : "Lorem ipsum dolor sit amet"}
    </CardHeader>
  }
}

export default PredictionHeader