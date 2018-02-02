import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

class AddItemToExpert extends Component {
  render() {
    const { type, addItemToExpert } = this.props
    const icon = <span className="fas fa-file" />
    
    return <Card title="add to expert" icon={icon}>
      <div className="add-expert-to-item">
        Add claim or prediction to expert!
      </div>
    </Card>
  }
}

export default AddItemToExpert