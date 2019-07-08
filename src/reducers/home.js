import {
  SUBMIT_NOTE,
  GET_NOTEBOOKS,
  SET_NOTEBOOK,
  ENTER_KEYWORD,
  ENTER_ANSWER,
} from '../constants/ActionTypes'

const initialState = {
  notebooks:"",
  notebookId: 0,
  keyword: "",
  answer: "",
  loaded: false,
  fadeout: true
}

export default function home(state = initialState, action){
  switch (action.type) {
    case SUBMIT_NOTE:
      return Object.assign({}, state, {keyword: "", answer:""})
    case GET_NOTEBOOKS:
      return Object.assign({}, state, {notebooks: action.payload})
    case SET_NOTEBOOK:
      return Object.assign({}, state, {notebookId: action.payload, loaded: true, fadeout:false})
    case ENTER_KEYWORD:
      return Object.assign({}, state, {keyword: action.payload})
    case ENTER_ANSWER:
      return Object.assign({}, state, {answer: action.payload})
    default:
      return Object.assign({}, state)
  }
}