import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

import PredictionsListItem from './PredictionsListItem'

class PredictionsList extends Component {
  render() {
    const { type, predictions } = this.props

    const icon = <span className="fas fa-bolt" />

    return <Card icon={icon} title={`predictions (${predictions.length})`}>
      <div className="predictions-list">
        <div className="predictions-list__items">
          {predictions.length === 0 && 
            <div className="predictions-list__items--empty">{`This expert has made no predictions.`}</div>
          }
          {predictions.map((item, index) => {
            return <PredictionsListItem item={item} key={`predictions_list_${type}_${index}`} />
          })}
        </div>
      </div>
    </Card>
  }
}

export default PredictionsList