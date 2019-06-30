import {
	GET_USER,
} from '../config'

export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
export const VALIDATE_EMAIL_SUCCESS = 'VALIDATE_EMAIL_SUCCESS';
export const VALIDATE_EMAIL_FAIL = 'VALIDATE_EMAIL_FAIL';

export function submitEmail(email){
	return {
		types: [VALIDATE_EMAIL, VALIDATE_EMAIL_SUCCESS, VALIDATE_EMAIL_FAIL],
		payload: {
			data: email,
			request: {
			  url: GET_USER+"/"+email,
			},
		},
	}
}