import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Icons from './../utilities/Icons'
import TimeFormatting from './../utilities/TimeFormatting'

import moment from 'moment'

class PredictionCard extends Component {
  getCategoryIcon = category => (category && category.name) ? <span className={Icons.get(category.id)} /> : <span />

  getStatusClass = status => {
    if (!status) status = "unknown"
    
    return "prediction-card__status--" + status
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

    const valid = ["unknown", "in-progress", "true", "false"].find((element) => element === status)
    if (valid) return status
  }


  voteStatus = (voteable_at = this.props.voteable_at, status = this.props.status) => {
    if (!voteable_at) return null
    const voteable = new Date(voteable_at)
    const now = new Date()

    if (status !== 0) return "closed"
    if (voteable < now) return "open"
    if (voteable >= now) return "pending"
  }


  timeToVote = (voteable_at = this.props.voteable_at) => {
    return TimeFormatting.prettyTimeRemaining(voteable_at)
  }


  predictionByDate = (voteable_at = this.props.voteable_at) => {
    return moment(voteable_at).format("MMMM Do, YYYY")
  }


  votingStatus = (voteable_at = this.props.voteable_at, voting_closes_at = this.props.voting_closes_at) => {
    const now = moment()
    const voteable = moment(voteable_at)
    const voting_closes = moment(voting_closes_at)

    if (now.diff(voteable) < 0) return ""

    if (voting_closes.diff(now) > 0) {
      return <span className="prediction-card__by-status--open">
        Voting open!
      </span>
    }

    if (voting_closes.diff(now) <= 0) {
      return <span className="prediction-card__by-status--closed">
        Voting Closed
      </span>
    }
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
      comments_count,
      bookmarks_count,
      voteable_at,
      voting_closes_at
    } = this.props;

    return <Link to={"/predictions/"+alias} className="hidden-link">
      <div className="prediction-card">
        {this.validStatusType(status) && <div className={this.getStatusClass(status)}>{this.formatStatusText(status)}</div>}

        <div className="prediction-card__title">
          {title && <div className="prediction-card__title-text">{title}</div>}
        </div>
        <div className="prediction-card__by">
          <span className="far fa-clock icon"></span>
          <span className="prediction-card__by-on">on</span>
          <span className="prediction-card__by-date">{this.predictionByDate(voteable_at)}</span>
          {this.votingStatus(voteable_at, voting_closes_at)}
        </div>
        <div className="prediction-card__description">
          {description && <div className="prediction-card__description-text">{description}</div>}
          {categories && <div className="prediction-card__description-category">{this.getCategoryIcon(categories[0])}</div>}
        </div>
        <div className="prediction-card__supporting">
          <div className="prediction-card__supporting__experts">
            <div className="prediction-card__supporting__experts-agree">
              <span className="icon fa fa-user-circle" />
              {experts_agree ? experts_agree : 'N/A'}
            </div>
            <div className="prediction-card__supporting__experts-disagree">
              <span className="icon fa fa-user-circle" />
              {experts_disagree ? experts_disagree: 'N/A'}
            </div>
          </div>
          <div className="prediction-card__supporting__evidence">
            <div className="prediction-card__supporting__evidence-against">
              <span className="icon fa fa-file-alt" />
              {evidence_against ? evidence_against : 'N/A'}
            </div>
            <div className="prediction-card__supporting__evidence-for">
              <span className="icon fa fa-file-alt" />
              {evidence_for ? evidence_for : 'N/A'}
            </div>
          </div>
        </div>
        <div className="prediction-card__bottom">
          <div className="prediction-card__bottom__votes">
            {this.voteStatus(voteable_at, status) === "open" &&
              <React.Fragment>
                <div className="prediction-card__bottom__vote-now">
                  Vote in next {TimeFormatting.prettyTimeRemaining(voting_closes_at, null)}!
                </div>
              </React.Fragment>
            }
            {this.voteStatus(voteable_at, status) === "pending" &&
              <React.Fragment>
                <div className="prediction-card__bottom__vote-in">Vote In {this.timeToVote(voteable_at)}</div>
              </React.Fragment>
            }
            {this.voteStatus(voteable_at, status) === "closed" &&
              <React.Fragment>
              <div className="prediction-card__bottom__votes-yes">
                <span className="icon fas fa-check" />
                {votes_yes ? votes_yes : 'N/A'}
              </div>
              <div className="prediction-card__bottom__votes-unsure">
                <span className="icon fas fa-question" />
                {votes_unsure ? votes_unsure : 'N/A'}
              </div>
              <div className="prediction-card__bottom__votes-no">
                <span className="icon fas fa-times" />
                {votes_no ? votes_no : 'N/A'}
              </div>
              </React.Fragment>
            }
          </div>
          <div className="prediction-card__bottom__meta">
            <div className="prediction-card__bottom__meta-comments">
              <span className="icon far fa-comment" />
              {comments_count ? comments_count : 'N/A'}
            </div>
            <div className="prediction-card__bottom__meta-bookmarks">
              <span className="icon far fa-bookmark" />
              {bookmarks_count ? bookmarks_count : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  }
}

export default PredictionCard