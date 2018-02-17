import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

class PredictionAdmin extends Component {
  render() {
    const { updatedPrediction } = this.props
    const icon = <span className="fas fa-pen-square" />
    return <Card title="card__admin" icon={icon}>
      <div className="card__admin-title">
        Admin
      </div>
    </Card>
  }
}

export default PredictionAdmin