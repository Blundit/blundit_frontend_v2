import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ExpertsListItem extends Component {
  formatRatingText = rating => {
    if (!rating) {
      return "UNKNOWN"
    }

    return this.getLetterGrade(rating).toUpperCase()
  }

  // TODO; Abstract this into utility class
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
        grade = "f"
        break
    }

    return grade
  }


  getRatingClass = rating => "experts-list__item-rating--" + (!rating ? "unknown" : this.getLetterGrade(rating))


  render() {
    const { item } = this.props

    return <div className="experts-list__item">
      <div className="experts-list__item-avatar" style={{backgroundImage: `url(${item.avatar})`}}></div>
      <div className="experts-list__item-text">
        <Link to={`/experts/${item.alias}`}>
          <div className="experts-list__item-text__name">{item.name}</div>
          <div className="experts-list__item-text__occupation">{item.job}{item.company ? " at " + item.company : ""}</div>
        </Link>
      </div>
      <div className={this.getRatingClass(item.rating)}>{this.getLetterGrade(item.rating).toUpperCase()}</div>
    </div>
  }
}

export default ExpertsListItem