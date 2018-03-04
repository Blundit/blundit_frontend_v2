import { combineReducers, createStore } from 'redux'

import user from './reducers/user'
import predictions from './reducers/predictions'
import claims from './reducers/claims'
import experts from './reducers/experts'
import announcements from './reducers/announcements'
import home_popular from './reducers/home_popular'
import search from './reducers/search'

let rootReducer = combineReducers({ user, predictions, claims, experts, announcements, home_popular, search })
let Store = createStore(rootReducer);

export default Store;