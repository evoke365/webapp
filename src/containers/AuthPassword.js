import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitPassword, enterPassword, loadingPassword } from '../actions/authPassword'
import { setView } from '../actions/app'
import { loadState, saveState } from '../localStorage'
import { AUTH_USER, POST_USER } from '../config'
import { ThreeBounce } from 'better-react-spinkit'
import 'whatwg-fetch'

class AuthPassword extends Component{
  componentDidMount() {
    if(loadState()) {
      if(typeof(loadState().email)!="undefined" && 
        typeof(loadState().token)!="undefined"){
        this.props.setView("home");
      }
    }
    ReactDOM.findDOMNode(this.refs.passwordInput).focus();
  }
  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.passwordInput).focus(); 
  }
  onSubmit() {
    this.props.loadingPassword(true);
    var returnUser = loadState().found;
    var endpoint = POST_USER
    if(returnUser){
      endpoint = AUTH_USER;
    }
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({"email":loadState().email, "password":this.props.store.authPassword.password})
    })
    .then(response => response.json())
    .then(data => {
      if(data.Success === true){
        this.props.submitPassword(false);
        saveState({"email":data.Body.Message.Email,"token":data.Body.Message.Token});
        this.props.setView("home");
      }
      else{
        this.props.submitPassword(true);
        this.props.loadingPassword(false);
      }
    })
    .catch(err => {
      //TODO: What if user email is invalid?
      console.log(err);
      return undefined;
    })
  }
	render() {
    var email = loadState().email;
    var error = this.props.store.authPassword.error;
    var loading = this.props.store.authPassword.loading;
		return (
      		<div className="step-2 clearfix">
        		<p className="text-header">studybox.io</p>
        		<p className="text-email">Hello, {email}</p>
        		<input onChange={(e)=>{
                this.props.enterPassword({
                  password: e.target.value
              })
            }}              
            onKeyDown={(e)=>{
              if(e.keyCode === 13){
                  this.onSubmit();
              }
            }} className={"_input" + (error ? " incorrect-input" : "")} type="password" placeholder="Your password" ref="passwordInput"/>
            <p className={"text-error" + (error ? " text-error-visible" : "")}>Whoops... the password you have entered is incorrect or invalid.</p>
        		<button className={loading ? "_button_disabled" : "_button"} onClick={() => {
              this.onSubmit()
            }} disabled={loading} >{loading ? <ThreeBounce size={15} color="#FFF"/> : "go to my notes!"}</button>
      		</div>
		)
	}
}

function mapStateToProps(store,props) {
	return {store,props}
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, bindActionCreators({ submitPassword, enterPassword, loadingPassword, setView }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPassword)