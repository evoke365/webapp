import React from 'react';
import PropTypes from 'prop-types';
import LoadingContainer from './loading';
import { withStyles } from '@material-ui/core/styles'

const CodeContainer = ({classes, onKeyDown, onChange, onNext, error, loading}) => (
  <div className={classes.container}>
    <input className={classes.input+(error === "" ? "" : " incorrect-input")} type="text" placeholder="Enter activation code" title="Enter the activation code in the email we have sent you"
    onKeyDown={onKeyDown} 
    onChange={onChange} />
    <LoadingContainer isLoading={loading} />
    <p className={"text-error" + (error === "" ? "" : " text-error-visible" )}>{error}</p>
    <button className={classes.btn} onClick={onNext}>next</button>
  </div>
);

const style = theme => ({
  container: {
    textAlign: 'center',
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
    display: 'block',
    width: '100%',
    maxWidth: '600px',
    height: '60px',
    margin: '0 auto',
    marginTop: '10px',
    borderRadius: '2px',
    backgroundColor: 'rgb(251, 167, 59)',
    fontSize: '1.667em',
  }
})

CodeContainer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
}

export default withStyles(style)(CodeContainer)