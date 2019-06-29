import authEmail from './authEmail'
import authPassword from './authPassword'
import home from './home'
import confirmation from './confirmation'
import { reducer as burgerMenu } from 'redux-burger-menu';
import { combineReducers } from 'redux'

const reducers = combineReducers({
	authEmail,
	authPassword,
	home,
	confirmation,
	burgerMenu
})

export default reducers