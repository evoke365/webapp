import React from 'react'
import PropTypes from 'prop-types';
import { APP_NAME } from '../../config'

var FontAwesome = require('react-fontawesome');

const NavContainer = ({onLogout}) => (
  <div>
    <div className="text-title" >{APP_NAME}</div>
    <div className="home-left-top">
      <p className="a-text">
        <button tabIndex="-1" className="_button btn-logout"  
        onClick={onLogout}>&nbsp;<FontAwesome name="sign-out"/></button>
      </p>
    </div>
  </div>
)

NavContainer.propTypes = {
    onLogout: PropTypes.func.isRequired,
}

export default NavContainer