import { Provider } from 'react-redux'
import { createStore } from 'redux'

const counter = ( state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DESCREMENT': 
      return state - 1
    default:
      return state;
  }
}

let Store = createStore(counter)
Store.dispatch({ type: 'INCREMENT'});

export default Store;