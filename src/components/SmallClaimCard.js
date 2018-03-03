import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Icons from './../utilities/Icons'

class SmallClaimCard extends Component {
  getCategoryIcon = category => (category) ? <span className={Icons.get(category)} /> : <span>?</span>


  render() {
    const { category, alias, title, claim_bookmarks_count, claim_comments_count } = this.props.item
    console.log(category)

    return <div className="small-card">
      <Link to={`/claims/${alias}`}>
        <div className="small-card--wrapper" >
          <div className="small-card__title">
            <div
              className="small-card__title-icon">
              {this.getCategoryIcon(category)}
            </div>
            {title}
          </div>
          <div className="small-card__comments">
            <span className="icon far fa-comment" />
            {claim_comments_count ? claim_comments_count : '0'}
          </div>
          <div className="claim-card__bottom__meta-bookmarks">
            <span className="icon far fa-bookmark" />
            {claim_bookmarks_count ? claim_bookmarks_count : '0'}
          </div>
        </div>
      </Link>
    </div>
  }
}

export default SmallClaimCard