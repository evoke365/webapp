import {
	SUBMIT_EMAIL,
} from '../constants/ActionTypes'

export function submitEmail(payload){
	return {
		type: SUBMIT_EMAIL,
		payload
	}
}