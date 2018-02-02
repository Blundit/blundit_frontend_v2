import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

class CategoriesList extends Component {
  render() {
    const { categories, type } = this.props

    return <Card title="Categories">
      <div className="categories-list">
        <div className="categories-list__description">{type}</div>
        <div className="categories-list__items">
          {categories.map((item) => {
            <Link to={`/categories/`}>
            <span className="categories-list__item">{item.name}</span>
            </Link>
          })}
        </div>
      </div>
    </Card>
  }
}

export default CategoriesList