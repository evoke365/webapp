export const API = "http://api.studybox.io:8080"
export const AUTH_API = "http://localhost:8090"

/* User */
export const GET_USER = AUTH_API + "/user/find"
export const AUTH_USER = AUTH_API + "/user/login"
export const POST_USER = AUTH_API + "/user/signup"
export const VERIFY_USER = AUTH_API + "/user/verify"

/* Notebook */
export const GET_NOTEBOOKS = API + "/notebooks"
export const POST_NOTEBOOK = API + "/notebook"

/* Note */
export const GET_NOTES = API + "/notes"
export const POST_NOTE = API + "/note"
export const PUT_NOTE = API + "/note/update"