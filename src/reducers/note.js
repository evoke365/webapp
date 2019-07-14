import {
    GET_NOTES, GET_NOTES_SUCCESS, GET_NOTES_FAIL,
    SUBMIT_NOTE, SUBMIT_NOTE_SUCCESS, SUBMIT_NOTE_FAIL,
    DELETE_NOTE, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAIL,
  } from '../actions/home'
  
const initialState = {
  notes: [],
  loadingGetNote: false,
  loadingSubmitNote: false,
  loadingDeletNote: false,
  error: "",
}

export default function note(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        ...{
          notes: state.notes,
          error: "",
          loadingGetNote: true,
        },
      };
    case GET_NOTES_SUCCESS:
    return {
      ...state,
      ...{
        notes: action.payload,
        error: "",
        loadingGetNote: false,
      },
    };
    case GET_NOTES_FAIL:
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "internal error",
        loadingGetNote: false,
      },
    };
    case SUBMIT_NOTE:
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "",
        loadingSubmitNote: true,
      },
    };
    case SUBMIT_NOTE_SUCCESS:
    state.notes.push(action.payload)
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "",
        loadingSubmitNote: false,
      },
    };
    case SUBMIT_NOTE_FAIL:
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "internal error",
        loadingSubmitNote: false,
      },
    };
    case DELETE_NOTE:
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "",
        loadingDeletNote: true,
      },
    };
    case DELETE_NOTE_SUCCESS:
    delete state.notes[action.meta.previousAction.internal.noteIndex];
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "",
        loadingDeletNote: false,
      },
    };
    case DELETE_NOTE_FAIL:
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "internal error",
        loadingDeletNote: false,
      },
    };
    default:
    return state;
  }
}