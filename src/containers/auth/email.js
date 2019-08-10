import React from 'react';
import PropTypes from 'prop-types';
import LoadingContainer from './loading';

const EmailContainer = ({onKeyDown, onChange, onNext, error, loading}) => (
  <div className="container-email-and-button clearfix">
    <p>Enter your email to sign up or sign in:</p>
    <input 
      className={"_input"+(error === "" ? "" : " incorrect-input")} 
      type="text" 
      placeholder="Your email address" 
      title="Use an email that is accessable on your mobile device."
      onKeyDown={onKeyDown} 
      onChange={onChange} />
    <LoadingContainer isLoading={loading}/>
    <p className={"text-error" + (error === "" ? "" : " text-error-visible" )}>{error}</p>
    <button disabled={loading} className="_button" onClick={onNext}>next</button>
  </div>
);

EmailContainer.propTypes = {
    onKeyDown: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default EmailContainer