import {
	POST_USER,
} from '../config'

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export function submitForm(email, password){
	return {
		types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
		payload: {
			request: {
                url: POST_USER,
                method: 'POST',
                data: {
                  email: email,
                  password: password,
                }
			},
		},
	}
}