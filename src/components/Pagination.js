import React, { Component } from 'react'

class Pagination extends Component {
  static defaultProps = {
    ...Component.defaultProps,
    max_distance: 1,
  }

  
  constructor() {
    super()
    this.state = {
      page: 1
    }
  }
 
 
  drawBackArrow () {
    if (this.state.page == 1) { return }
    return <span className="pagination__back" onClick={this.previousPage}>
      <span className="fas fa-caret-square-left"></span>
    </span>
  }


  drawNextArrow () {
    if (this.state.page == this.props.number_of_pages) { return }
    return <span className="pagination__next" onClick={this.nextPage}>
      <span className="fas fa-caret-square-right"></span>
    </span>
  }

  
  previousPage = () => {
    let new_page = this.state.page - 1
    if (new_page < 1) {
      new_page = 1
    }

    this.setState({ page: new_page }, () => this.props.updatePage(new_page) )
  }


  nextPage = () => {
    let new_page = this.state.page + 1
    if (new_page > this.props.number_of_pages) {
      new_page = this.props.number_of_pages
    }

    this.setState({ page: new_page }, () => this.props.updatePage(new_page) )
  }


  specificPage = (new_page) => {
    this.setState({ page: new_page }, () => this.props.updatePage(new_page) )
  }

  
  drawFirstPage () {
    const { page } = this.state
    const { max_distance, number_of_pages } = this.props
    const number_of_visible_pages = (max_distance * 2) + 1

    if (page <= 2 && number_of_pages > number_of_visible_pages) { 
      return
    }

    if (number_of_pages <= number_of_visible_pages) {
      return
    }

    return <React.Fragment>
      <span className="pagination__first">
        <span className="pagination__item" onClick={this.specificPage.bind(this, 1)}>1</span>
      </span>
      {(page >= number_of_visible_pages && (page - max_distance > 2))&&
        <span className="pagination__ellipsis">...</span>
      }
    </React.Fragment>
  }


  drawLastPage () {
    const { page } = this.state
    const { number_of_pages, max_distance } = this.props
    const number_of_visible_pages = (max_distance * 2) + 1

    if (number_of_pages - page < (max_distance * 2)) { 
      return
    }

    if (number_of_pages <= number_of_visible_pages) {
      return
    }

    return <React.Fragment>
      {(number_of_pages - page >= (number_of_visible_pages)) &&
        <span className="pagination__ellipsis">...</span>
      }
      <span className="pagination__last">
        <span className="pagination__item" onClick={this.specificPage.bind(this, number_of_pages)}>{number_of_pages}</span>
      </span>
    </React.Fragment>
  }
  

  drawPages () {
    const { page } = this.state
    const { number_of_pages, max_distance } = this.props

    let leftPage = page - max_distance
    let rightPage = page + max_distance
    const number_of_visible_pages = (max_distance * 2) + 1

    if (number_of_pages <= number_of_visible_pages) {
      leftPage = 1
      rightPage = number_of_pages
    }

    if (leftPage < 1) {
      let offset = leftPage - 1

      leftPage += Math.abs(offset)
      rightPage += Math.abs(offset)
    }

    if (rightPage > number_of_pages) {
      let offset = number_of_pages - rightPage
      
      leftPage -= Math.abs(offset)
      rightPage -= Math.abs(offset)
    }

    let rows = []
    for (let i = leftPage; i <= rightPage; i++) {
      if (i == page) {
        rows.push(<span className="pagination__item--selected" key={`pagination_${i}`}>{i}</span>)
      } else {
        rows.push(<span className="pagination__item" key={`pagination-${i}`} onClick={this.specificPage.bind(this, i)}>{i}</span>)
      }
    }

    return <span className="pagination__pages">{rows}</span>
  }


  render() {
    const { number_of_pages, page } = this.props
    if (number_of_pages < 2) {
      return <div></div>
    }

    return <div className="pagination">
      {this.drawBackArrow()}
      {this.drawFirstPage()}
      {this.drawPages()}
      {this.drawLastPage()}
      {this.drawNextArrow()}
    </div>
  }
}

export default Pagination