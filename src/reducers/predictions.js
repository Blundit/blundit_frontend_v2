export default ( state = 0, action) => {
  switch (action.type) {
    case 'UPDATE_PREDICTION':
      return state + 1
    case 'ADD_PREDICTION': 
      return state - 1
    case 'SET_PREDICTIONS':
      return state;
    default:
      return state;
  }
}