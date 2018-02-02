import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

class ShareItem extends Component {
  render() {
    const { type, object } = this.props

    return <Card title="share">
      <div className={`${type}-share`}>
        Share info will go here.
      </div>
    </Card>
  }
}

export default ShareItem