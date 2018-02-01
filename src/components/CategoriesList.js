import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CategoriesList extends Component {
  render() {
    const { claim, type } = this.props

    return <div className="categories-list">
      <div classname="categories-list__title">Categories</div>
      <div className="categories-list__description">{type}</div>
      <div className="categories-list__items">
        {claim.categories.map((item) => {
          <Link to={`/categories/`}>
          <span className="categories-list__item">{item.name}</span>
          </Link>
        })}
      </div>
    </div>
  }
}

export default CategoriesList