import React from 'react'
import PropTypes from 'prop-types';

var FontAwesome = require('react-fontawesome');

const NavContainer = ({onLogout}) => (
  <div>
    <div className="text-title" >studybox.io</div>
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