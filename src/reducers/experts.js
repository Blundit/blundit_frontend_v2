import Cache from './../utilities/Cache'

export default ( state = 0, action) => {
  switch (action.type) {
    case 'SET_EXPERT_LIST':
      let new_state = state;
      if (!state) new_state = [];
      const itemPresent = Cache.present(new_state, action.value)
      if (itemPresent) new_state.splice(itemPresent, 1)

      const new_state_item = Object.assign(action.value, { created: Date.now() })
      new_state.push(new_state_item)
      
      let ss = Cache.prune(new_state)
      return ss
    default:
      return state;
  }
}