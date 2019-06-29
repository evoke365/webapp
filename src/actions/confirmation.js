import {
	ENTER_NOTEBOOK_NAME,
	CONFIRM_NOTEBOOK_NAME
} from '../constants/ActionTypes'

export function confirmNotebookName(payload){
	return {
		type: CONFIRM_NOTEBOOK_NAME,
		payload
	}
}

export function enterNotebookName(payload){
	return {
		type: ENTER_NOTEBOOK_NAME,
		payload
	}
}