import React, { Component } from 'react'
import BookmarkDisplay from './BookmarkDisplay';

class Card extends Component {
  constructor() {
    super()
    this.state = {
      open: true
    }
  }


  toggleOpen = () => {
    this.setState({ open: !this.state.open })
  }


  render() {
    const { title, children, toggleBookmark, bookmark } = this.props
    return <div className="card-header" >
      <div className="card-header__strip">
        <div className="card-header__strip-title">{title}</div>
        <div className="card-header__strip-status">S</div>
        <BookmarkDisplay toggleBookmark={toggleBookmark} bookmark={bookmark} />
      </div>
      <div className="card-header__content">
        {children}
      </div>
    </div>
  }
}

export default Card