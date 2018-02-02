import React, { Component } from 'react'
import BookmarkDisplay from './BookmarkDisplay';
import Icons from './../utilities/Icons'

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


  getCategoryIcon = category => (category && category.name) ? <span className={Icons.get(category.id)} /> : <span />


  render() {
    const { 
      title, 
      status, 
      statusBar, 
      children, 
      toggleBookmark, 
      bookmark, 
      categories, 
      bg } = this.props

    return <div className="card-header" >
      <div className="card-header__strip">
        <div className="card-header__strip-title">{title}</div>
        <div className="card-header__strip-status">{status}</div>
        <BookmarkDisplay toggleBookmark={toggleBookmark} bookmark={bookmark} />
      </div>
      <div className="card-header__image" style={{ backgroundImage:bg }}>
        <div className="card-header__category">{this.getCategoryIcon(categories[0])}</div>
      </div>
      <div className="card-header__status-bar">{statusBar}</div>
      <div className="card-header__content">{children}</div>
    </div>
  }
}

export default Card