import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Icons from './../utilities/Icons'


class ClaimCard extends Component {
  getCategoryIcon = category => (category && category.name) ? <span className={Icons.get('category_'+category.id)} /> : <span />

  getStatusClass = status => {
    if (!status) status = "unknown"
    
    return "claim-card__status--" + status
  }


  formatStatusText = status => {
    if (!status) status = "unknown"
    const statuses = { 
      "unknown": "unknown",
      "in-progress": "voting in progress",
      "true": "true",
      "false": "false",
    }

    return statuses[status].toUpperCase()
  }


  validStatusType = status => {
    if (!status) status = "unknown"

    const valid = ["unknown", "in-progress", "true", "false"].find((element) => element == status)
    if (valid) return status
  }


  render() {
    const {
      alias,
      title,
      status,
      description,
      categories,
      experts_agree,
      experts_disagree,
      evidence_for,
      evidence_against,
      votes_yes,
      votes_unsure,
      votes_no,
      votes_count,
      comments_count,
      bookmarks_count
    } = this.props;

    return <Link to={"/claims/"+alias} className="hidden-link">
      <div className="claim-card">
        {this.validStatusType(status) && <div className={this.getStatusClass(status)}>{this.formatStatusText(status)}</div>}

        <div className="claim-card__title">
          {title && <div className="claim-card__title-text">{title}</div>}
        </div>
        <div className="claim-card__description">
          {description && <div className="claim-card__description-text">{description}</div>}
          {categories && <div className="claim-card__description-category">{this.getCategoryIcon(categories[0])}</div>}
        </div>
        <div className="claim-card__supporting">
          <div className="claim-card__supporting__experts">
            <div className="claim-card__supporting__experts-agree">
              <span className="icon fa fa-home" />
              {experts_agree ? experts_agree : 'N/A'}
            </div>
            <div className="claim-card__supporting__experts-disagree">
              <span className="icon fa fa-home" />
              {experts_disagree ? experts_disagree: 'N/A'}
            </div>
          </div>
          <div className="claim-card__supporting__evidence">
            <div className="claim-card__supporting__evidence-against">
              <span className="icon fa fa-home" />
              {evidence_against ? evidence_against : 'N/A'}
            </div>
            <div className="claim-card__supporting__evidence-for">
              <span className="icon fa fa-home" />
              {evidence_for ? evidence_for : 'N/A'}
            </div>
          </div>
        </div>
        <div className="claim-card__bottom">
          <div className="claim-card__bottom__votes">
            <div className="claim-card__bottom__votes-yes">{votes_yes ? votes_yes : 'N/A'}</div>
            <div className="claim-card__bottom__votes-unsure">{votes_unsure ? votes_unsure : 'N/A'}</div>
            <div className="claim-card__bottom__votes-no">{votes_no ? votes_no : 'N/A'}</div>
          </div>
          <div className="claim-card__bottom__meta">
            <div className="claim-card__bottom__meta-bookmarks">{bookmarks_count ? bookmarks_count : 'N/A'}</div>
            <div className="claim-card__bottom__meta-comments">{comments_count ? comments_count : 'N/A'}</div>
          </div>
        </div>
      </div>
    </Link>
  }
}

export default ClaimCard