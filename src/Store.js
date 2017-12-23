import { combineReducers, createStore } from 'redux'

import user from './reducers/user';
import predictions from './reducers/predictions';
import claims from './reducers/claims';

let rootReducer = combineReducers({ user, predictions, claims })
let Store = createStore(rootReducer);

export default Store;