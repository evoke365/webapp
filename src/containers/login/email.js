import React from 'react'
import PropTypes from 'prop-types';

const EmailContainer = ({onKeyDown, onChange, onNext, error}) => (
    <div className="container-email-and-button clearfix">
          <input className={"_input"+(error === "" ? "" : " incorrect-input")} type="text" placeholder="Your email address" title="Use an email that is accessable on your mobile device."
          onKeyDown={onKeyDown} 
          onChange={onChange} />
          <p className={"text-error" + (error === "" ? "" : " text-error-visible" )}>{error}</p>
          <button className="_button" onClick={onNext}>next</button>
    </div>
);

EmailContainer.propTypes = {
    onKeyDown: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
}

export default EmailContainer