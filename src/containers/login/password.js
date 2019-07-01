import React from 'react'
import PropTypes from 'prop-types';

const PasswordContainer = ({email, onKeyDown, onChange, onSubmit, error, loading}) => (
  <div>
    <p className="text-email">Welcome back, {email}</p>
    <input 
      onChange={onChange}        
      onKeyDown={onKeyDown}
      className={"_input" + (error ? " incorrect-input" : "")} 
      type="password" 
      placeholder="Your password" 
    />
    <p className={"text-error" + (error ? " text-error-visible" : "")}>{error}</p>
    <button 
      className={loading ? "_button_disabled" : "_button"} 
      onClick={onSubmit} 
      disabled={loading} >{loading ? "..." : "go to my notes!"}
    </button>
  </div>  
);

PasswordContainer.propTypes = {
  email: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default PasswordContainer