import {
  VALIDATE_PASSWORD, VALIDATE_PASSWORD_SUCCESS, VALIDATE_PASSWORD_FAIL
} from '../actions/login'

const initialState = {
  token: "",
  loading: false,
  error: "",
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
        },
      };
    case VALIDATE_PASSWORD_SUCCESS:
    return {
      ...state,
      ...{
        token: action.payload.token,
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
      },
    };
    default:
    return state;
  }
}

