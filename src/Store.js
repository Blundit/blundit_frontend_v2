import { combineReducers, createStore } from 'redux'

import user from './reducers/user'
import predictions from './reducers/predictions'
import claims from './reducers/claims'
import experts from './reducers/experts'
import announcements from './reducers/announcements'

let rootReducer = combineReducers({ user, predictions, claims, experts, announcements })
let Store = createStore(rootReducer);

export default Store;