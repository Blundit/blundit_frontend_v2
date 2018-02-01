import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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

    return <div className={`${type}-comments`}>
      Comments cluster will go here.
    </div>
  }
}

export default ItemComments