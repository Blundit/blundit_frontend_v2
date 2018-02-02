import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

class AddExpertToItem extends Component {
  render() {
    const { type, addExpert } = this.props
    const icon = <span className="fas fa-user-plus" />
    
    return <Card title="add expert" icon={icon}>
      <div className="add-expert-to-item">
        Add expert to Item!
      </div>
    </Card>
  }
}

export default AddExpertToItem