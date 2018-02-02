import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

import ClaimsListItem from './ClaimsListItem'

class ClaimsList extends Component {
  render() {
    const { type, claims } = this.props

    const icon = <span className="fas fa-lightbulb" />

    return <Card icon={icon} title={`claims (${claims.length})`}>
      <div className="claims-list">
        <div className="claims-list__items">
          {claims.length === 0 && 
            <div className="claims-list__items--empty">{`This expert has made no claims.`}</div>
          }
          {claims.map((item, index) => {
            return <ClaimsListItem item={item} key={`claims_list_${type}_${index}`} />
          })}
        </div>
      </div>
    </Card>
  }
}

export default ClaimsList