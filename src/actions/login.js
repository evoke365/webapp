import {
    GET_USER, AUTH_USER, FORGET_PASSWORD_USER
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

export const VALIDATE_PASSWORD = 'VALIDATE_PASSWORD';
export const VALIDATE_PASSWORD_SUCCESS = 'VALIDATE_PASSWORD_SUCCESS';
export const VALIDATE_PASSWORD_FAIL = 'VALIDATE_PASSWORD_FAIL';
export function submitPassword(email, password){
  return {
    types: [VALIDATE_PASSWORD, VALIDATE_PASSWORD_SUCCESS, VALIDATE_PASSWORD_FAIL],
    payload: {
      request: {
        url: AUTH_USER,
        method: 'POST',
        data: {
          email: email,
          password: password,
        }
      },
    },
  }
}

export const CLEAR_ERROR = 'CLEAR_ERROR'
export function clearError() {
  return  {
    type: CLEAR_ERROR
  }
}

export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const FORGET_PASSWORD_SUCCESS = 'FORGET_PASSWORD_SUCCESS';
export const FORGET_PASSWORD_FAIL = 'FORGET_PASSWORD_FAIL';
export function forgetPassword(email){
  return {
    types: [FORGET_PASSWORD, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAIL],
    payload: {
      request: {
        url: FORGET_PASSWORD_USER,
        method: 'PUT',
        data: {
          email: email,
        }
      },
    },
  }
}