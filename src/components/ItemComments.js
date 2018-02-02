import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

class ItemComments extends Component {
  constructor() {
    super()

    this.state = {
      page: 1,
      comments: []
    }
  }


  render() {
    const { type, id } = this.props

    return <Card title="comments">
      <div className={`${type}-comments`}>
        Comments cluster will go here.
      </div>
    </Card>
  }
}

export default ItemComments