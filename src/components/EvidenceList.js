import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'
import EvidenceListItem from './EvidenceListItem'

class EvidenceList extends Component {
  render() {
    const { type, addEvidence } = this.props
    let icon

    let evidences = [
      { position: "for" },
      { position: "for" },
      { position: "against" }
    ]

    let filtered_evidences = evidences.filter((element) => element.position === type)

    if (type === "for") {
      icon = <span className="icon--success fa fa-file-alt" />
    } else {
      icon = <span className="icon--error fa fa-file-alt" />
    }

    return <Card icon={icon} title={`evidence ${type} (${filtered_evidences.length})`}>
      <div className="evidences">
        <div className="evidences__list">
          {filtered_evidences.map((item, index) => {
            return <EvidenceListItem key={`evidence-${index}`} type={type} item={item} />
          })}
        </div>
        <div className="evidence__add">
          Add Evidence Goes Here.
        </div>
      </div>
    </Card>
  }
}

export default EvidenceList