import Cache from './../utilities/Cache'

let itemPresent, new_state_item, new_state, ss

export default ( state = 0, action) => {
  switch (action.type) {
    case 'SET_PREDICTION_LIST':
      new_state = state;
      if (!state) new_state = [];
      itemPresent = Cache.present(new_state, action.value)
      if (itemPresent) new_state.splice(itemPresent, 1)

      new_state_item = Object.assign(action.value, { created: Date.now() })
      new_state.push(new_state_item)
      
      ss = Cache.prune(new_state)
      return ss
    case 'SET_PREDICTION':
      if (!state) new_state = []
      itemPresent = Cache.present(new_state, action.value)
      if (itemPresent) new_state.splice(itemPresent, 1)

      new_state_item = Object.assign(action.value, { created: Date.now() })
      new_state.push(new_state_item)
      
      ss = Cache.prune(new_state)
      return ss
    default:
      return state;
  }
}