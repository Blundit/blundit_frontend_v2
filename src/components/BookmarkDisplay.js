import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BookmarkDisplay extends Component {

  render() {
    const { toggleBookmark, bookmark } = this.props

    return <div className="bookmark-display" onClick={this.toggleBookmark}>
      <span className="far fa-bookmark" style={{ display: (bookmark === true ? "none" : "inline") }} />
      <span className="fas fa-bookmark" style={{ display: (bookmark === true ? "inline" : "none") }} />
    </div>
  }
}

export default BookmarkDisplay