export const RESOURCE_API = "http://jgao.io:8080"
export const AUTH_API = "http://jgao.io:8090"

/* User */
export const GET_USER = AUTH_API + "/user/find"
export const AUTH_USER = AUTH_API + "/user/login"
export const POST_USER = AUTH_API + "/user/signup"
export const VERIFY_USER = AUTH_API + "/user/verify"
export const FORGET_PASSWORD_USER = AUTH_API + "/user/forget"

/* Note */
export const GET_NOTES_API = RESOURCE_API + "/notes"
export const POST_NOTE_API = RESOURCE_API + "/note"
export const DELETE_NOTE_API = RESOURCE_API + "/note"
export const PUT_NOTE = RESOURCE_API + "/note/update"