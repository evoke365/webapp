import React from 'react';
import PropTypes from 'prop-types';
import LoadingContainer from './loading';
import { withStyles } from '@material-ui/core/styles'

const EmailContainer = ({
    classes, onKeyDown, onChange, onNext, error, loading
}) => (
  <div className={classes.container}>
    <div className={classes.heading}>
      <p>Put whatever you want to remember in your Studybox</p>
    </div>
    <p className={classes.text}>Enter your email to sign up or sign in:</p>
    <input 
      className={classes.input+(error === "" ? "" : " incorrect-input")} 
      placeholder="Your email eddress"
      type="text" 
      title="Use an email that is accessable on your mobile device."
      onKeyDown={onKeyDown} 
      onChange={onChange} />
    <LoadingContainer isLoading={loading}/>
    <p className={"text-error" + (error === "" ? "" : " text-error-visible" )}>{error}</p>
    <div>
      <button disabled={loading} className={classes.btn} onClick={onNext}>next</button>
    </div>
    <div>
      <p></p>
    </div>
  </div>
);

EmailContainer.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
}

const style = theme => ({
  container: {
    padding: '50px 20px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '30px',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '2.5em',
    fontWeight: '900',
  },
  input: {
    display: 'block',
    width: '100%',
    maxWidth: '600px',
    height: '60px',
    margin: '0 auto',
    borderBottom: '1px solid rgb(251, 167, 59)',
    fontSize: '1.667em',
    fontWeight: '300',
    textAlign: 'center',
    color: 'rgb(0, 0, 0)',
  },
  text: {
    fontSize: '1.275em',
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

export default withStyles(style)(EmailContainer)