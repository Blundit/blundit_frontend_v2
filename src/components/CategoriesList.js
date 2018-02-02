import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

class CategoriesList extends Component {
  render() {
    const { categories, type } = this.props
    const icon = <span className="fas fa-tags" />

    return <Card title="Categories" icon={icon}>
      <div className="categories-list">
        <div className="categories-list__description">{`This ${type} is in the following categories:`}</div>
        <div className="categories-list__items">
          {categories.map((item, index) => {
            return <Link to={`/categories/${item.id}`} key={`category_list_${index}`}>
            <span className="categories-list__item">{item.name}</span>
            </Link>
          })}
        </div>
      </div>
    </Card>
  }
}

export default CategoriesList