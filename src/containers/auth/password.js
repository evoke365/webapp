import React from 'react';
import PropTypes from 'prop-types';
import LoadingContainer from './loading';
import { withStyles } from '@material-ui/core/styles'

const PasswordContainer = ({classes, onKeyDown, onChange, onSubmit, onForget, error, loading, showForget}) => (
  <div className={classes.container}>
    <input 
      onChange={onChange}        
      onKeyDown={onKeyDown}
      className={classes.input + (error ? " incorrect-input" : "")} 
      type="password" 
      placeholder="Your password" 
    />
    <LoadingContainer isLoading={loading} />
    <p className={"text-error" + (error ? " text-error-visible" : "")}>{error}</p>
    <button 
      disabled={loading}
      className={classes.btn}
      onClick={onSubmit}>
      next
    </button>
    {showForget && (
      <div className={classes.forget}>
        <button 
          disabled={loading}
          className="_link"
          onClick={onForget}>
          I have forgotten my password
        </button>
      </div>
    )}
  </div>
);

const style = theme => ({
  container: {
    display: 'block',
    maxWidth: '600px',
    margin: '0 auto',
  },
  input: {
    display: 'block',
    width: '100%',
    maxWidth: '600px',
    height: '60px',
    margin: '0 auto',
    borderBottom: '1px solid rgb(251, 167, 59)',
    fontSize: '1.5em',
    fontWeight: '300',
    textAlign: 'center',
    color: 'rgb(0, 0, 0)',
  },
  btn: {
    width: '100%',
    height: '60px',
    fontSize: '25px',
    backgroundColor: 'rgb(251, 167, 59)',
    color: '#000000',
  },
  forget: {
    textAlign: 'center',
  }
})

PasswordContainer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  showForget: PropTypes.bool,
  onForget: PropTypes.func,
}

export default withStyles(style)(PasswordContainer)