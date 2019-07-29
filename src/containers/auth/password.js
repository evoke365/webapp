import React from 'react'
import PropTypes from 'prop-types';
import LoadingContainer from './loading'

const PasswordContainer = ({onKeyDown, onChange, onSubmit, error, loading}) => (
  <div>
    <input 
      onChange={onChange}        
      onKeyDown={onKeyDown}
      className={"_input" + (error ? " incorrect-input" : "")} 
      type="password" 
      placeholder="Your password" 
    />
    <LoadingContainer isLoading={loading} />
    <p className={"text-error" + (error ? " text-error-visible" : "")}>{error}</p>
    <button 
      disabled={loading}
      className="_button"
      onClick={onSubmit}>
      next
    </button>
  </div>
);

PasswordContainer.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default PasswordContainer