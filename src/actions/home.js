import {
	SUBMIT_NOTE,
	GET_NOTES,
	GET_NOTEBOOKS,
	SET_NOTEBOOK,
	ENTER_KEYWORD,
	ENTER_ANSWER,
	PAGE_LOADED
} from '../constants/ActionTypes'

export function submitNote(payload){
	return {
		type: SUBMIT_NOTE,
		payload
	}
}

export function getNotes(payload){
	return {
		type: GET_NOTES,
		payload
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