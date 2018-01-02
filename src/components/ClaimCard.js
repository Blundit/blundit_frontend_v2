import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class ClaimCard extends Component {
  getCategoryImage = category => "/categories/" + category + ".png"

  getStatusClass = status => "claim-card__status--" + status

  formatStatusText = status => status.toUpperCase()
  

  validStatusType(status) {
    let valid = ["unknown", "true", "false"].find((element) => element == status)
    if (valid) return status
  }


  render() {
    const {
      alias,
      title,
      status,
      description,
      category,
      experts_agree,
      experts_disagree,
      evidence_for,
      evidence_against,
      votes_yes,
      votes_unsure,
      votes_no,
      number_of_bookmarks,
      number_of_comments
    } = this.props;

    return <Link to={"/claims/"+alias}>
      <div className="claim-card">
        {this.validStatusType(status) && <div className={this.getStatusClass(status)}>{this.formatStatusText(status)}</div>}
        <div className="claim-card__title">
          {title && <div className="claim-card__title-text">{title}</div>}
        </div>
        <div className="claim-card__description">
          {description && <div className="claim-card__description-text">{description}</div>}
          {category && <div className="claim-card__description-category"><img src={this.getCategoryImage(category)} /></div>}
        </div>
        <div className="claim-card__supporting">
          <div className="claim-card__supporting__experts">
            <div className="claim-card__supporting__experts-agree">{experts_agree ? experts_agree : 'N/A'}</div>
            <div className="claim-card__supporting__experts-disagree">{experts_disagree ? experts_disagree: 'N/A'}</div>
          </div>
          <div className="claim-card__supporting__evidence">
            <div className="claim-card__supporting__evidence-for">{evidence_for ? evidence_for : 'N/A'}</div>
            <div className="claim-card__supporting__evidence-against">{evidence_against ? evidence_against : 'N/A'}</div>
          </div>
        </div>
        <div className="claim-card__bottom">
          <div className="claim-card__bottom__votes">
            <div className="claim-card__bottom__votes-yes">{votes_yes ? votes_yes : 'N/A'}</div>
            <div className="claim-card__bottom__votes-unsure">{votes_unsure ? votes_unsure : 'N/A'}</div>
            <div className="claim-card__bottom__votes-no">{votes_no ? votes_no : 'N/A'}</div>
          </div>
          <div className="claim-card__bottom__meta">
            <div className="claim-card__bottom__meta-bookmarks">{number_of_bookmarks ? number_of_bookmarks : 'N/A'}</div>
            <div className="claim-card__bottom__meta-comments">{number_of_comments ? number_of_comments : 'N/A'}</div>
          </div>
        </div>
      </div>
    </Link>
  }
}

export default ClaimCard