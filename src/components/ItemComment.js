import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'
import TimeFormatting from './../utilities/TimeFormatting'

class ItemComment extends Component {
  render() {
    const { comment } = this.props

    console.log(comment)

    return <div className="comments__comment">
      <div className="comments__comment-user-avatar" style={{backgroundImage: `url(${comment.user.avatar})`}}></div>
      <div className="comments__comment-content">
        <div className="comments__comment-content-user-name">{comment.user.first_name} {comment.user.last_name}</div>
        <div className="comments__comment-content-created-at">{TimeFormatting.prettyTimeAgo(comment.created_at)}</div>
        <div className="comments__comment-content-text">{comment.content}</div>
      </div>
    </div>
  }
}

export default ItemComment