import {
  SUBMIT_PASSWORD,
  ENTER_PASSWORD,
  PAGE_LOADED
} from '../constants/ActionTypes'

const initialState = {
  password: "",
  error: false,
  loading: false
}

export default function authPassword(state = initialState, action){
  switch (action.type) {
    case SUBMIT_PASSWORD:
      return Object.assign({}, state, {error: action.payload, loading: true})
  	case ENTER_PASSWORD:
      return Object.assign({}, state, {password: action.payload.password, error:false})
    case PAGE_LOADED:
      return Object.assign({}, state, {loading: action.payload})
    default:
      return Object.assign({}, state)
  }
}