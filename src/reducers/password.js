import {
  VALIDATE_PASSWORD, VALIDATE_PASSWORD_SUCCESS, VALIDATE_PASSWORD_FAIL, 
  FORGET_PASSWORD, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAIL,
  CLEAR_ERROR
} from '../actions/login'

const initialState = {
  token: "",
  loading: false,
  error: "",
  action: "",
}

export default function authPassword(state = initialState, action){
  switch (action.type) {
    case VALIDATE_PASSWORD:
      return {
        ...state,
        ...{
          token: "",
          error: "",
          loading: true,
          action: "",
        },
      };
    case VALIDATE_PASSWORD_SUCCESS:
    return {
      ...state,
      ...{
        token: action.payload.token,
        action: action.payload.action,
        error: "",
        loading: false,
      },
    };
    case VALIDATE_PASSWORD_FAIL:
    return {
      ...state,
      ...{
        token: "",
        error: "internal error",
        loading: false,
        action: "",
      },
    };
    case FORGET_PASSWORD:
      return {
        ...state,
        ...{
          token: "",
          error: "",
          loading: true,
          action: "",
        },
      };
    case FORGET_PASSWORD_SUCCESS:
    return {
      ...state,
      ...{
        action: "forget",
        error: "",
        loading: false,
      },
    };
    case FORGET_PASSWORD_FAIL:
    return {
      ...state,
      ...{
        token: "",
        error: "internal error",
        loading: false,
        action: "",
      },
    };
    case CLEAR_ERROR:
      return {
        ...state,
        ...{
          error: "",
        },
      }
    default:
    return state;
  }
}

