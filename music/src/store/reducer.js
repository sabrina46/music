import { combineReducers } from 'redux'
import { actionTypes } from './action';

const keyword = (state = '', action) => {
  switch (action.type) {
    case actionTypes.SET_KEYWORD:
      return action.payload
    default:
      return state
  }
}
const reducers = combineReducers({
  keyword
})

export default reducers
