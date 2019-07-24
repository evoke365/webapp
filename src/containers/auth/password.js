import React from 'react'
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    width: 600px;
`;

const PasswordContainer = ({onKeyDown, onChange, onSubmit, error, loading}) => (
  <div>
    <input 
      onChange={onChange}        
      onKeyDown={onKeyDown}
      className={"_input" + (error ? " incorrect-input" : "")} 
      type="password" 
      placeholder="Your password" 
    />
    <p className={"text-error" + (error ? " text-error-visible" : "")}>{error}</p>
    <button 
      className="_button"
      onClick={onSubmit}>
      next
    </button>
    <BarLoader
      css={override}
      color={'#FBA73B'}
      loading={loading}
    />
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