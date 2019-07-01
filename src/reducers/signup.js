import {
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL
  } from '../actions/signup'
  
  const initialState = {
    response: "",
    loading: false,
    error: "",
  }
  
  export default function newSignup(state = initialState, action){
    switch (action.type) {
      case SIGNUP:
        return {
          ...state,
          ...{
            response: null,
            error: null,
            loading: true,
          },
        };
      case SIGNUP_SUCCESS:
      return {
        ...state,
        ...{
        response: action.payload,
        error: null,
        loading: false,
        },
      };
      case SIGNUP_FAIL:
      return {
        ...state,
        ...{
        response: null,
        error: "internal error",
        loading: false,
        },
      };
      default:
      return state;
    }
  }