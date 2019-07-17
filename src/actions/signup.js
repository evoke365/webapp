import {
    POST_USER, VERIFY_USER
} from '../config'

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export function submitPassword(email, password){
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    payload: {
      request: {
        url: POST_USER,
        method: 'POST',
        data: {
          email: email,
          password: password,
          timezone: new Date().getTimezoneOffset()/-60,
        }
      },
    },
  }
}

export const VERIFY_CODE = 'VERIFY_CODE';
export const VERIFY_CODE_SUCCESS = 'VERIFY_CODE_SUCCESS';
export const VERIFY_CODE_FAIL = 'VERIFY_CODE_FAIL';

export function submitCode(email, code){
  return {
    types: [VERIFY_CODE, VERIFY_CODE_SUCCESS, VERIFY_CODE_FAIL],
    payload: {
      request: {
        url: VERIFY_USER,
        method: 'POST',
        data: {
          email: email,
          code: code,
        }
      },
    },
  }
}