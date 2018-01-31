import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Icons from './../utilities/Icons'


class ExpertCard extends Component {
  getCategoryIcon = category => (category && category.name) ? <span className={Icons.get('category_'+category.id)} /> : <span />


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
    }

    return grade
  }


  getRatingClass = rating => "expert-card__rating--" + (!rating ? "unknown" : this.getLetterGrade(rating))


  formatRatingText = rating => {
    if (!rating) {
      return "UNKNOWN"
    }

    return `RATING: ${this.getLetterGrade(rating).toUpperCase()} (${rating}%)`
    
  }


  render() {
    const {
      name,
      rating,
      job,
      company,
      number_of_predictions,
      number_of_claims,
      comments_count,
      bookmarks_count,
      url,
      location,
      image,
      alias,
      status,
      description,
      categories,
    } = this.props

    let { avatar } = this.props

    if (!avatar || avatar.indexOf("default.png", 0) > -1 || avatar.indexOf("missing.png", 0) > -1) {
      avatar = "https://fast-earth-30912.herokuapp.com/images/expert_avatars/default.png"
    }

    return <Link to={"/experts/"+alias} className="hidden-link">
      <div className="expert-card">
        <div className="expert-card__avatar" style={{backgroundImage: "url('"+avatar+"')" }} >
          <div className={this.getRatingClass(rating)}>{this.formatRatingText(rating)}</div>
          <span className="expert-card__name">
            {name && name}
            {!name && "N/A"}
          </span>
        </div>
        <div className="expert-card__description">
          <React.Fragment>
            <div>
              <div className="expert-card__description-job">
                <span className="expert-card__description-job-title">{job ? job : "N/A"}</span>
                <span className="expert-card__description-job-at"> at </span>
                <span className="expert-card__description-job-company">{company ? company : "Unknown"}</span>
              </div>
              <div className="expert-card__description-location">{location ? location : "Location Unknown"}</div>
              <div className="expert-card__description-url">
                <span className="icon fas fa-link"></span>
                {url ? url : "URL Unknown"}
              </div>
            </div>
          </React.Fragment>
          {categories && <div className="expert-card__description-category">{this.getCategoryIcon(categories[0])}</div>}
        </div>
        <div className="expert-card__bottom">
          <div className="expert-card__bottom__positions">
            <div className="expert-card__bottom__positions__number-of-predictions">
              <span className="icon fas fa-bolt" />
              {number_of_predictions ? number_of_predictions : 'N/A'}
            </div>
            <div className="expert-card__bottom__positions__number-of-claims">
              <span className="icon far fa-lightbulb" />
              {number_of_claims ? number_of_claims : 'N/A'}
            </div>
          </div>
          <div className="expert-card__bottom__meta">
            <div className="expert-card__bottom__meta-comments">
              <span className="icon far fa-comment" />
              {comments_count ? comments_count : 'N/A'}
            </div>
            <div className="expert-card__bottom__meta-bookmarks">
              <span className="icon far fa-bookmark" />
              {bookmarks_count ? bookmarks_count : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  }
}

export default ExpertCard