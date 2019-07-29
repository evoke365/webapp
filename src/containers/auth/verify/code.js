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

const CodeContainer = ({onKeyDown, onChange, onNext, error, loading}) => (
  <div className="container-email-and-button clearfix">
    <input className={"_input"+(error === "" ? "" : " incorrect-input")} type="text" placeholder="Enter activation code" title="Enter the activation code in the email we have sent you"
    onKeyDown={onKeyDown} 
    onChange={onChange} />
    <BarLoader
      css={override}
      color={'#FBA73B'}
      loading={loading}
    />
    <p className={"text-error" + (error === "" ? "" : " text-error-visible" )}>{error}</p>
    <button className="_button" onClick={onNext}>next</button>
  </div>
);

CodeContainer.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
}

export default CodeContainer