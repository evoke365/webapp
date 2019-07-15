import React from 'react'
import PropTypes from 'prop-types';

var FontAwesome = require('react-fontawesome');

const NavContainer = ({email, onLogout}) => (
  <div>
    <p className="text-title" >studybox.io</p>
    <div className="home-left-top">
      <p className="a-text"><FontAwesome name="user-circle"/>{email}</p>
      <button tabIndex="-1" className="_button btn-logout"  
      onClick={onLogout}>&nbsp;<FontAwesome name="sign-out"/> </button>
    </div>
  </div>
)

NavContainer.propTypes = {
    email: PropTypes.string,
    onLogout: PropTypes.func.isRequired,
}

export default NavContainer