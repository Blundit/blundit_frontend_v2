import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Icons from './../utilities/Icons'


class ExpertCard extends Component {
  getCategoryIcon = category => (category && category.name) ? <span className={Icons.get('category_'+category.id)} /> : <span />

  getRatingClass = rating => {
    // TODO: MAKE THIS PULL RATING PROPERLY
    if (!rating) rating = "unknown"
    
    return "expert-card__rating--" + rating
  }


  formatRatingText = rating => {
    if (!rating) rating = null

    // TODO: MAKE THIS PULL IN RATING
    const statuses = { 
      "unknown": "unknown",
      "in-progress": "voting in progress",
      "true": "true",
      "false": "false",
    }


    // return "Rating: statuses[status].toUpperCase()"
    return "Rating: A (100%)"
  }


  render() {
    const {
      name,
      rating,
      job,
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
      categories

    } = this.props;

    return <Link to={"/experts/"+alias} className="hidden-link">
      <div className="expert-card">
        <div className="expert-card__image" style={{background: "url('"+image+"')" }} >
          <div className={this.getRatingClass(rating)}>{this.formatRatingText(rating)}</div>
          <div className="expert-card__name" s>
            <div className="expert-card__name-text">
              {name && name}
              {!name && "N/A"}
            </div>
          </div>
        </div>
        <div className="expert-card__description">
          {description && 
            <React.Fragment>
              <div className="expert-card__description-job">{job}</div>
              <div className="expert-card__description-location">{location}</div>
              <div className="expert-card__description-url">
                <span className="far fa-link"></span>
                <a href={url}>{url}</a>
              </div>
            </React.Fragment>
          }
          {categories && <div className="expert-card__description-category">{this.getCategoryIcon(categories[0])}</div>}
        </div>
        <div className="expert-card__bottom">
          <div className="expert-card__bottom__positions">
            <div className="expert-card__bottom__positions__number-of-predictions">
              <span className="icon far fa-comment" />
              {number_of_predictions ? number_of_predictions : 'N/A'}
            </div>
            <div className="expert-card__bottom__positions__number-of-claims">
              <span className="icon far fa-bookmark" />
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