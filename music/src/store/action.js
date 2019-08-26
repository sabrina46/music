const SET_KEYWORD = 'SET_KEYWORD'

export let actionTypes = {
  SET_KEYWORD,
}

export function createAction (type, payload) {
  return {
    type,
    payload
  }
}
