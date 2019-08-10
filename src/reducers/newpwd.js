import {
    NEW_PASSWORD, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAIL
  } from '../actions/forget'
  
  const initialState = {
    success: null,
    loading: false,
    error: "",
  }
  
  export default function newPassword(state = initialState, action){
    switch (action.type) {
      case NEW_PASSWORD:
        return {
          ...state,
          ...{
            success: null,
            error: "",
            loading: true,
          },
        };
      case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        ...{
        success: action.payload,
        error: "",
        loading: false,
        },
      };
      case NEW_PASSWORD_FAIL:
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