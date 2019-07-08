import {
    GET_NOTES, GET_NOTES_SUCCESS, GET_NOTES_FAIL,
  } from '../actions/home'
  
  const initialState = {
    notes: [],
    loading: false,
    error: "",
  }
  
  export default function note(state = initialState, action){
    switch (action.type) {
      case GET_NOTES:
        return {
          ...state,
          ...{
            notes: [],
            error: "",
            loading: true,
          },
        };
      case GET_NOTES_SUCCESS:
      return {
        ...state,
        ...{
            notes: action.payload,
          error: "",
          loading: false,
        },
      };
      case GET_NOTES_FAIL:
      return {
        ...state,
        ...{
            notes: null,
          error: "internal error",
          loading: false,
        },
      };
      default:
      return state;
    }
  }
  
  