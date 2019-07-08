import authEmail from './authEmail'
import newSignup from './signup'
import authPassword from './authPassword'
import verifyUser from './verify'
import home from './home'
import note from './note'
import confirmation from './confirmation'
import { reducer as burgerMenu } from 'redux-burger-menu';
import { combineReducers } from 'redux'

const reducers = combineReducers({
	authEmail,
	newSignup,
	authPassword,
	verifyUser,
	home,
	note,
	confirmation,
	burgerMenu
})

export default reducers