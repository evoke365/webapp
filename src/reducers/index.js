import authEmail from './email'
import newSignup from './signup'
import authPassword from './password'
import verifyUser from './verify'
import note from './note'
import { reducer as burgerMenu } from 'redux-burger-menu';
import { combineReducers } from 'redux'

const reducers = combineReducers({
	authEmail,
	newSignup,
	authPassword,
	verifyUser,
	note,
	burgerMenu
})

export default reducers