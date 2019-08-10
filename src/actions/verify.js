import {
    VERIFY_USER
} from '../config'

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