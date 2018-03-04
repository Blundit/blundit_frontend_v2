import React, { Component } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Cache from './../utilities/Cache'
import API from './../utilities/API'
import { connect } from 'react-redux'

import PredictionCard from './../components/PredictionCard'
import InsideSearch from './../components/InsideSearch'
import LoadingIndicator from './../components/LoadingIndicator'
import Pagination from './../components/Pagination'

const mapStateToProps = (state) => {
  return {
    predictions: state.predictions,
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO: Do I need to call some other dispatch?
  return {
    set_prediction_list: (ownProps) => dispatch({ 
      type: "SET_PREDICTION_LIST",
      value: ownProps
    })
  }
}


class Predictions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      page: 1,
      sort: '',
      number_of_pages: null
    }
  }

  componentDidMount () {
    this.loadPredictions()
  }


  loadPredictions() {
    const { predictions, set_prediction_list } = this.props;
    const { search, page, sort } = this.state;


    if (Cache.invalid(predictions, { type: 'prediction', key: 'predictions_list', search: search, page: page, sort: sort, created: Date.now() })) {
      const params = {
        path: "predictions",
        data: {
          page: page,
          query: search,
          sort: sort
        }
      }

      API.do(params).then((result) => {
        this.setState({
          number_of_pages: result.number_of_pages,
          page: Number(result.page)
        })
        set_prediction_list({ type: 'prediction', key: 'predictions_list', search: search, page: page, sort: sort, items: result.predictions, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
      });
    }
  }


  updateSearch = (search) => {
    if (search != this.state.search) {
      this.setState({ search: search, page: 1}, () => this.loadPredictions() )
    }
  }


  updatePage = (page) => {
    if (page != this.state.page) {
      this.setState({ page: page}, () => this.loadPredictions() )
    }
  }



  render() {
    const { predictions } = this.props;
    const { search, page, sort, number_of_pages } = this.state; 
    const items = Cache.items(predictions, { type: 'prediction', key: 'predictions_list', search: search, page: page, sort: sort})

    return <div>
      <Header/>
      <div className="container">
        <InsideSearch type={"prediction"} updateSearch={this.updateSearch} />
        <div className="predictions">
          {items === undefined && <LoadingIndicator />}
          {items &&
            items.map((item, index) => (
              <PredictionCard key={"prediction"+index} {...item} voteable_at={"2018-01-15"} voting_closes_at={"2018-01-31"} />
            )
          )}
          {(items && items.length === 0) &&
            <div className="none-found">No Predictions Found</div>
          }
        </div>
        <Pagination page={page} number_of_pages={number_of_pages} updatePage={this.updatePage} />
      </div>
      <Footer/>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Predictions);