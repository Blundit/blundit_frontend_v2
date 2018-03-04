import Cache from './../utilities/Cache'

export default ( state = 0, action) => {
  let new_state = state
  let itemPresent, new_state_item, ss

  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
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