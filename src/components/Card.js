import React, { Component } from 'react'

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
    const { title, children } = this.props
    return <div className={(this.state.open === true ? "card" : "card--closed")} >
      <div className="card__strip">
        <div className="card__strip-title">{title}</div>
        <div className="card__strip-chevron" onClick={this.toggleOpen}>
          <span style={{display: (this.state.open === false ? "none" : "inline") }}>
            <span className="fas fa-chevron-up" />
          </span>
          <span style={{display: (this.state.open === true ? "none" : "inline") }}>
            <span className="fas fa-chevron-down" />
          </span>
        </div>
      </div>
      <div className="card__content">
        {children}
      </div>
    </div>
  }
}

export default Card