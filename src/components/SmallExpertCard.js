import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SmallExpertCard extends Component {
  getAvatar () {
    const { avatar } = this.props.item
    if (avatar.indexOf("missing.png", 0) > -1) {
      return "/images/avatars/missing.png"
    }

    return avatar
  }

  render() {
    const { avatar, alias, name, expert_bookmarks_count, expert_comments_count } = this.props.item

    return <div className="small-card">
    <Link to={`/experts/${alias}`}>
      <div className="small-card--wrapper" >
        <div className="small-card__title">
          <div
            className="small-card__title-image" 
            style={{ backgroundImage: "url("+this.getAvatar()+")" }}
            />
          {name}
        </div>
        <div className="small-card__comments">
          <span className="icon far fa-comment" />
          {expert_comments_count ? expert_comments_count : '0'}
        </div>
        <div className="small-card__bookmarks">
          <span className="icon far fa-bookmark" />
          {expert_bookmarks_count ? expert_bookmarks_count : '0'}
        </div>
      </div>
    </Link>
  </div>
  }
}

export default SmallExpertCard