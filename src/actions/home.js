import {
	GET_NOTEBOOKS,
	SET_NOTEBOOK,
	ENTER_KEYWORD,
	ENTER_ANSWER,
	PAGE_LOADED
} from '../constants/ActionTypes'
import { GET_NOTES_API, POST_NOTE_API } from '../config'

export const SUBMIT_NOTE = 'SUBMIT_NOTE';
export const SUBMIT_NOTE_SUCCESS = 'SUBMIT_NOTE_SUCCESS';
export const SUBMIT_NOTE_FAIL = 'SUBMIT_NOTE_FAIL';

export function submitNote(token, title, body){
	return {
		type: [SUBMIT_NOTE, SUBMIT_NOTE_SUCCESS, SUBMIT_NOTE_FAIL],
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

export function enterKeyword(payload){
		return {
		type: ENTER_KEYWORD,
		payload
	}
}

export function enterAnswer(payload){
		return {
		type: ENTER_ANSWER,
		payload
	}
}

export function getNotebooks(payload){
	return {
		type: GET_NOTEBOOKS,
		payload
	}
}

export function setNotebook(payload){
	return {
		type: SET_NOTEBOOK,
		payload
	}
}

export function pageLoaded(payload){
	return {
		type: PAGE_LOADED,
		payload
	}
}