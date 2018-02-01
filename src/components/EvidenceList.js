import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import EvidenceListItem from './EvidenceListItem'

class EvidenceList extends Component {
  render() {
    const { type, evidence, addEvidence } = this.props

    return <div className={`${type}-evidence`}>
      <div className={`${type}-evidence__title`}>evidence <b>{`(${evidence.count})`}</b></div>
      <div className={`${type}-evidence__list`}>
        {evidence.map((item, index) => {
          <EvidenceListItem key={`${type}-evidence-${index}`} type={type} item={item} />
        })}
      </div>
      <div className={`${type}-evidence__add`}>
        Add Evidence Goes Here.
      </div>
    </div>
  }
}

export default EvidenceList