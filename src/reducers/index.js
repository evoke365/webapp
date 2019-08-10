import authEmail from './email'
import newSignup from './signup'
import authPassword from './password'
import forgetPassword from './forget'
import newPassword from './newpwd'
import verifyUser from './verify'
import note from './note'
import { reducer as burgerMenu } from 'redux-burger-menu';
import { combineReducers } from 'redux'
import { clearState } from '../localStorage'

const childReducers = combineReducers({
	authEmail,
	newSignup,
	authPassword,
	forgetPassword,
	newPassword,
	verifyUser,
	note,
	burgerMenu
})

const reducers = (state, action) => {
	if (action.type === 'USER_LOGOUT') {
		clearState();
		state = undefined
	}
	return childReducers(state, action)
}

export default reducers