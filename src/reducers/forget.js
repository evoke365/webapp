import {
    FORGET_PASSWORD, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAIL
  } from '../actions/login'
  
  const initialState = {
    success: null,
    loading: false,
    error: "",
  }
  
  export default function forgetPassword(state = initialState, action){
    switch (action.type) {
      case FORGET_PASSWORD:
        return {
          ...state,
          ...{
            success: null,
            error: "",
            loading: true,
          },
        };
      case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        ...{
        success: action.payload,
        error: "",
        loading: false,
        },
      };
      case FORGET_PASSWORD_FAIL:
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