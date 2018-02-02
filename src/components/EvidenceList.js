import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'
import EvidenceListItem from './EvidenceListItem'

class EvidenceList extends Component {
  render() {
    const { type, evidences, addEvidence } = this.props

    return <Card title={`evidence (${evidences.length})`}>
      <div className={`${type}-evidence`}>
        <div className={`${type}-evidence__list`}>
          {evidences.map((item, index) => {
            <EvidenceListItem key={`${type}-evidence-${index}`} type={type} item={item} />
          })}
        </div>
        <div className={`${type}-evidence__add`}>
          Add Evidence Goes Here.
        </div>
      </div>
    </Card>
  }
}

export default EvidenceList