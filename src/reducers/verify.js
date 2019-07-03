import {
    VERIFY_CODE, VERIFY_CODE_SUCCESS, VERIFY_CODE_FAIL
  } from '../actions/signup'

const initialState = {
  email: "",
  token: "",
  loading: false,
  error: "",
}

export default function verifyUser(state = initialState, action){
  switch (action.type) {
    case VERIFY_CODE:
      return {
        ...state,
        ...{
          response: null,
          error: null,
          loading: true,
        },
      };
    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        ...{
        response: action.payload,
        error: null,
        loading: false,
        },
      };
    case VERIFY_CODE_FAIL:
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