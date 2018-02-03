import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookmarkDisplay from './BookmarkDisplay'
import CardHeader from './CardHeader'
import CategoryImages from './../utilities/CategoryImages'

class ExpertHeader extends Component {
  // TODO: ABSTRACT FORMAT STATUS TEXT CALLS 
  // INTO SITE-WIDE UTILS

  getLetterGrade = rating => {
    let grade

    switch (true) {
      case (rating < 50):
        grade = "f"
        break
      case (rating < 60):
        grade = "d"
        break
      case (rating < 70):
        grade = "c"
        break
      case (rating < 80):
        grade = "b"
        break
      case (rating >= 80):
        grade = "a"
        break
      default:
        grade = "?"
        break
    }

    return grade
  }


  getStatusClass = status => {
    if (!status) status = "unknown"
    
    return "card-header__status-bar--" + status
  }


  getRatingClass = rating => "card-header__status--" + (!rating ? "unknown" : this.getLetterGrade(rating))


  formatRatingText = rating => {
    if (!rating) {
      return "RATING: UNKNOWN"
    }

    return `RATING: ${this.getLetterGrade(rating).toUpperCase()} (${rating}%)`
    
  }


  render() {
    const { expert, toggleBookmark } = this.props
    const status = <span className={this.getRatingClass(expert.rating)}>{this.getLetterGrade(expert.rating)}</span>
    const statusBar = <div className={this.getStatusClass(expert.rating)}>{this.formatRatingText(expert.rating)}</div>
    return <CardHeader
      title={expert.name}
      status={status}
      toggleBookmark={toggleBookmark}
      bookmark={expert.bookmark}
      categories={expert.categories}
      bg={`url(${expert.avatar})`}
      statusBar={statusBar}
      >
      {expert.description ? expert.description : (<i>This expert does not yet have a description.</i>)}
    </CardHeader>
  }
}

export default ExpertHeader