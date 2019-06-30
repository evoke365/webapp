import {
  VALIDATE_EMAIL, VALIDATE_EMAIL_SUCCESS, VALIDATE_EMAIL_FAIL
} from '../actions/authEmail'

const initialState = {
  email: null,
  loading: false,
  error: null,
}

export default function authEmail(state = initialState, action){
  switch (action.type) {
    case VALIDATE_EMAIL:
      return {
        ...state,
        ...{
          email: null,
          error: null,
          loading: true,
        },
      };
    case VALIDATE_EMAIL_SUCCESS:
    return {
      ...state,
      ...{
        email: action.payload.email,
        error: null,
        loading: false,
      },
    };
    case VALIDATE_EMAIL_FAIL:
    return {
      ...state,
      ...{
        email: null,
        error: "internal error",
        loading: false,
      },
    };
    default:
    return state;
  }
}