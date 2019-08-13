import {
  FORGET_PASSWORD_USER
} from '../config'

export const NEW_PASSWORD = 'NEW_PASSWORD';
export const NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS';
export const NEW_PASSWORD_FAIL = 'NEW_PASSWORD_FAIL';
export function newPassword(email, token, password){
  return {
    types: [NEW_PASSWORD, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAIL],
    payload: {
      request: {
        url: FORGET_PASSWORD_USER,
        method: 'PUT',
        data: {
          email: email,
          token: token,
          password: password,
        }
      },
    },
  }
}