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
          email: "",
          token: "",
          loading: true,
          error: "",
        },
      };
    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        ...{
          email: action.payload.email,
          token: action.payload.token,
          loading: false,
          error: "",
        },
      };
    case VERIFY_CODE_FAIL:
      return {
        ...state,
        ...{
        email: "",
        token: "",
        loading: false,
        error: "internal error",
        },
      };
    default:
    return state;
  }
}