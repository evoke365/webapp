import {
    GET_NOTES, GET_NOTES_SUCCESS, GET_NOTES_FAIL,
    SUBMIT_NOTE, SUBMIT_NOTE_SUCCESS, SUBMIT_NOTE_FAIL,
    DELETE_NOTE, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAIL,
    MARK_NOTES, MARK_NOTES_SUCCESS, MARK_NOTES_FAIL,
  } from '../actions/home'
  
const initialState = {
  notes: [],
  loading: false,
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
        notes: state.notes,
        error: "internal error",
        loading: false,
      },
    };
    case SUBMIT_NOTE:
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "",
        loading: true,
      },
    };
    case SUBMIT_NOTE_SUCCESS:
    state.notes.push(action.payload);
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "",
        loading: false,
      },
    };
    case SUBMIT_NOTE_FAIL:
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "internal error",
        loading: false,
      },
    };
    case MARK_NOTES:
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "",
        loading: true,
      },
    }
    case MARK_NOTES_SUCCESS:
        let affectedNote = state.notes[action.meta.previousAction.internal.noteIndex];
        affectedNote.Important = !affectedNote.Important;
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "",
        loading: false,
      },
    }
    case MARK_NOTES_FAIL:
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "internal error",
        loading: false,
      },
    }
    case DELETE_NOTE:
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "",
        loading: true,
      },
    };
    case DELETE_NOTE_SUCCESS:
    delete state.notes[action.meta.previousAction.internal.noteIndex];
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "",
        loading: false,
      },
    };
    case DELETE_NOTE_FAIL:
    return {
      ...state,
      ...{
        notes: state.notes,
        error: "internal error",
        loading: false,
      },
    };
    default:
    return state;
  }
}