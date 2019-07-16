import {
  VALIDATE_EMAIL, VALIDATE_EMAIL_SUCCESS, VALIDATE_EMAIL_FAIL
} from '../actions/login'

const initialState = {
  found: null,
  loading: false,
  error: "",
}

export default function authEmail(state = initialState, action){
  switch (action.type) {
    case VALIDATE_EMAIL:
      return {
        ...state,
        ...{
          found: null,
          error: "",
          loading: true,
        },
      };
    case VALIDATE_EMAIL_SUCCESS:
    return {
      ...state,
      ...{
        found: action.payload,
        error: "",
        loading: false,
      },
    };
    case VALIDATE_EMAIL_FAIL:
    return {
      ...state,
      ...{
        found: null,
        error: "internal error",
        loading: false,
      },
    };
    default:
    return state;
  }
}

