import React from 'react'
import PropTypes from 'prop-types';

const FormContainer = ({onTypingEmail, onTypingPassword, onSubmit, error}) => (
    <div className="container-email-and-button clearfix">
        <input className={"_input"+(error === "" ? "" : " incorrect-input")} type="text" placeholder="Your email address" title="Use an email that is accessable on your mobile device."
          onChange={onTypingEmail} />
        <input className={"_input"+(error === "" ? "" : " incorrect-input")} type="password" placeholder="Your password" title="Use a safe password."
          onChange={onTypingPassword} />
        <p className={"text-error" + (error === "" ? "" : " text-error-visible" )}>{error}</p>
        <button className="_button" onClick={onSubmit}>submit</button>
    </div>
);

FormContainer.propTypes = {
    onTypingEmail: PropTypes.func.isRequired,
    onTypingPassword: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
}

export default FormContainer