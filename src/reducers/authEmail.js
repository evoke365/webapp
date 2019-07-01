import {
  VALIDATE_EMAIL, VALIDATE_EMAIL_SUCCESS, VALIDATE_EMAIL_FAIL
} from '../actions/login'

const initialState = {
  email: "",
  loading: false,
  error: "",
}

export default function authEmail(state = initialState, action){
  switch (action.type) {
    case VALIDATE_EMAIL:
      return {
        ...state,
        ...{
          email: "",
          error: "",
          loading: true,
        },
      };
    case VALIDATE_EMAIL_SUCCESS:
      console.log("here");
    return {
      ...state,
      ...{
        email: action.payload,
        error: "",
        loading: false,
      },
    };
    case VALIDATE_EMAIL_FAIL:
    return {
      ...state,
      ...{
        email: "",
        error: "internal error",
        loading: false,
      },
    };
    default:
    return state;
  }
}

