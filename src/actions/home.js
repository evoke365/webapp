import { GET_NOTES_API, POST_NOTE_API, DELETE_NOTE_API } from '../config'

export const SUBMIT_NOTE = 'SUBMIT_NOTE';
export const SUBMIT_NOTE_SUCCESS = 'SUBMIT_NOTE_SUCCESS';
export const SUBMIT_NOTE_FAIL = 'SUBMIT_NOTE_FAIL';
export function submitNote(token, title, body){
  return {
    type: SUBMIT_NOTE,
    payload: {
      request: {
        url: POST_NOTE_API,
        method: 'POST',
        data: {
          token: token,
          title: title,
          body: body,
        }
      },
    },
  }
}

export const GET_NOTES = 'GET_NOTES';
export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
export const GET_NOTES_FAIL = 'GET_NOTES_FAIL';
export function getNotes(userId){
  return {
    types: [GET_NOTES, GET_NOTES_SUCCESS, GET_NOTES_FAIL],
    payload: {
      request: {
        url: GET_NOTES_API+"/"+userId,
      },
    },
  }
}

export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_FAIL = 'DELETE_NOTE_FAIL';
export function deleteNote(token, noteId, index) {
  return {
    type: DELETE_NOTE,
    payload: {
      request: {
        url: DELETE_NOTE_API,
        method: 'DELETE',
        data: {
          token: token,
          noteId: noteId,
        }
      },
    },
    internal: {
      noteIndex: index,
    }
  }
}