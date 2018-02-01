import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ShareItem extends Component {
  render() {
    const { type, object } = this.props

    return <div className={`${type}-share`}>
      Share info will go here.
    </div>
  }
}

export default ShareItem