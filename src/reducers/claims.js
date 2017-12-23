export default ( state = 0, action) => {
  switch (action.type) {
    case 'UPDATE_CLAIM':
      return state + 1
    case 'ADD_CLAIM': 
      return state - 1
    case 'SET_CLAIMS':
      return state;
    default:
      return state;
  }
}