const GET_APP_LIST = 'GET_APP_LIST'

export let actionTypes = {
  GET_APP_LIST,
}

export function createAction (type, payload) {
  return {
    type,
    payload
  }
}
