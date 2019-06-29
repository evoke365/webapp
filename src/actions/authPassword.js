import {
	SUBMIT_PASSWORD,
	ENTER_PASSWORD,
	PAGE_LOADED
} from '../constants/ActionTypes'

export function submitPassword(payload){
	return {
		type: SUBMIT_PASSWORD,
		payload
	}
}

export function enterPassword(payload){
	return {
		type: ENTER_PASSWORD,
		payload
	}
}

export function loadingPassword(payload){
	return {
		type: PAGE_LOADED,
		payload
	}
}