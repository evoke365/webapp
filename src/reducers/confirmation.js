import {
  ENTER_NOTEBOOK_NAME,
  CONFIRM_NOTEBOOK_NAME
} from '../constants/ActionTypes'

const initialState = {
  name: "",
  error: false
}

export default function confirmation(state = initialState, action){
  switch (action.type) {
    case CONFIRM_NOTEBOOK_NAME:
      return Object.assign({}, state, {error: action.payload})
    case ENTER_NOTEBOOK_NAME:
      return Object.assign({}, state, {name: action.payload})
    default:
      return Object.assign({}, state)
  }
}