import React from 'react'
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    max-width: 600px;
    width: 80%;
`;

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
    <BarLoader
      css={override}
      color={'#FBA73B'}
      loading={loading}
    />
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