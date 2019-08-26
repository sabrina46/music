import { combineReducers } from 'redux'
import { actionTypes } from './action';

const appList = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_APP_LIST:
      return action.payload
    default:
      return state
  }
}
const reducers = combineReducers({
  appList
})

export default reducers
