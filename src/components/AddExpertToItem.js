import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AddExpertToItem extends Component {
  render() {
    const { type, addExpert } = this.props

    return <div className="add-expert-to-item">
      Add expert to Item.
    </div>
  }
}

export default AddExpertToItem