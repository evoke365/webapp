import {
    SUBMIT_EMAIL,
    ENTER_EMAIL
  } from '../constant'
  
  const initialState = {
    email: "",
    error: ""
  }
  
  export default function authEmail(state = initialState, action){
    switch (action.type) {
      case SUBMIT_EMAIL:
        return Object.assign({}, state, {error: action.payload})
      case ENTER_EMAIL:
        return Object.assign({}, state, {email: action.payload.email, error:""})
      default:
        return Object.assign({}, state)
    }
  }