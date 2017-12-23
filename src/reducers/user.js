export default ( state = null, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      if (action.value) {
        state = action.value
      }
      return state
    case 'USER_LOGOUT': 
      state = null;
      return state
    case 'USER_EDIT':
      let state_changes = action.value;
      let new_state = state;

      if (typeof(new_state) === "object") {
        new_state = Object.assign(state, state_changes);
      } 
      
      return new_state;
    default:
      return state;
  }
}