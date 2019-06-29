import {
  SUBMIT_EMAIL
} from '../constants/ActionTypes'

const initialState = {
  email: "",
  error: ""
}

export default function authEmail(state = initialState, action){
  switch (action.type) {
    case SUBMIT_EMAIL:
      return Object.assign({}, state, {error: action.payload})
    default:
      return Object.assign({}, state)
  }
}