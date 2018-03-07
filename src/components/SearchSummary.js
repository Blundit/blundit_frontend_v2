import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

class SearchSummary extends Component {
  pluralize(val) {
    if (val > 1) return "s"
    return ""
  }


  snapToSection = (key, e) => {
    const id = "search_" + key
    const el = document.getElementById(id)
    const topPos = el.offsetTop - 78

    window.scrollTo(0, topPos)
    
    e.preventDefault()
  }


  render() {
    const { query, items } = this.props
    return <Card>
      <div className="search-summary__header">
        Your search for <span>'{query}'</span> returned the following results:
      </div>
      <div className="search-summary__info">
        <a
          href="#"
          onClick={this.snapToSection.bind(this, "predictions")}
          >
          <span className="icon fas fa-lightbulb" />
          {`${items.predictions_count} Prediction${this.pluralize(items.predictions_count)}`}
        </a>
      </div>
      <div className="search-summary__info">
        <a 
          href="#"
          onClick={this.snapToSection.bind(this, "claims")}
          >
          <span className="icon fas fa-bolt" />
          {`${items.claims_count} Claim${this.pluralize(items.claims_count)}`}
        </a>
      </div>
      <div className="search-summary__info">
        <a 
          href="#"
          onClick={this.snapToSection.bind(this, "experts")}
          >
          <span className="icon fa fa-user-circle" />
          {`${items.experts_count} Expert${this.pluralize(items.experts_count)}`}
        </a>
      </div>

      <div className="search-summary__footer">
        Click or scroll to view the results.
      </div>
    </Card>
  }
}

export default SearchSummary