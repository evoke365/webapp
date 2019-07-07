import {
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL
  } from '../actions/signup'
  
  const initialState = {
    success: null,
    loading: false,
    error: "",
  }
  
  export default function newSignup(state = initialState, action){
    switch (action.type) {
      case SIGNUP:
        return {
          ...state,
          ...{
            success: null,
            error: "",
            loading: true,
          },
        };
      case SIGNUP_SUCCESS:
      return {
        ...state,
        ...{
        success: action.payload,
        error: "",
        loading: false,
        },
      };
      case SIGNUP_FAIL:
      return {
        ...state,
        ...{
        success: null,
        error: "internal error",
        loading: false,
        },
      };
      default:
      return state;
    }
  }