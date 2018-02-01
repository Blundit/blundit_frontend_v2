import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EvidenceListItem extends Component {
  render() {
    const { type, item } = this.props

    return <div className={`${type}-evidence__list__item`}>
      Evidence Item goes here
    </div>
  }
}

export default EvidenceListItem