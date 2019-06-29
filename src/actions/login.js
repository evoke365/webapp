import {
	SUBMIT_EMAIL,
	ENTER_EMAIL
} from '../constant'

export function submitEmail(payload){
	return {
		type: SUBMIT_EMAIL,
		payload
	}
}

export function enterEmail(payload){
	return {
		type: ENTER_EMAIL,
		payload
	}
}