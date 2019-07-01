import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitEmail, submitPassword } from '../../actions/login'
import { loadState, saveState } from '../../localStorage'
import EmailContainer from './email'
import PasswordContainer from './password'

const INVALID_EMAIL_ERROR = "Let’s try that again, the email address you have entered is invalid."
const EMAIL_NOT_FOUND_ERROR = "The email you have entered has not been registered."
const INVALID_PASSWORD_ERROR = "Whoops... the password you have entered is incorrect or invalid."

class Login extends Component{
  state = {
    email: "",
    password: "",
    error: "",
    emailValid: false,
  }
  componentDidMount() {
    if(loadState()) {
      if(typeof(loadState().email)!="undefined" && 
        typeof(loadState().token)!="undefined"){
      }
    }
  }
  componentDidUpdate() {
    if (this.state.emailValid === false) {
      if (this.props.store.authEmail.email !== "") {
        this.setState({
          email: "",
          password: "",
          error: "",
          emailValid: true,
        })
      }
      if (this.props.store.authEmail.error !== "" && this.state.error === "") {
        this.setState({
          email: this.state.email,
          error: EMAIL_NOT_FOUND_ERROR,
        })
      }
    } else {
      if (this.props.store.authPassword.token !== "") {
        saveState({
          "email":this.props.store.authEmail.email,
          "token":this.props.store.authPassword.token
        });
        this.props.history.push("/home");
      }
      if (this.props.store.authPassword.error !=="" && this.state.error === "") {
        this.setState({
          error: INVALID_PASSWORD_ERROR,
        })
      }
    }
  }
  onSubmitEmail(){
    if (this.state.email === "" || validateEmail(this.state.email) === false) {
      this.setState({
        email: this.state.email,
        error: INVALID_EMAIL_ERROR,
      })
    }  
    this.props.submitEmail(this.state.email);
  }
  onSubmitPassword(){
    if (this.state.password === "") {
      this.setState({
        password: "",
        error: INVALID_PASSWORD_ERROR,
      })
    }
    this.props.submitPassword(this.state.email);
  }
  getEmailView(){
    return (
      <EmailContainer 
        onKeyDown={(e)=>{
          if(e.keyCode === 13){
              this.onSubmitEmail();
            }
        }}
        onChange={(e)=>{
          this.setState({
              email: e.target.value,
              error: "",
        })}}
        onNext={(e)=>{this.onSubmitEmail()}}
        error={this.state.error} 
      />
    );
  }
  getPasswordView(){
    return (
      <PasswordContainer
        email={this.props.store.authEmail.email}
        onKeyDown={(e)=>{
          if(e.keyCode === 13){
              this.onSubmitPassword();
            }
        }}
        onChange={(e)=>{
          this.setState({
              password: e.target.value,
              error: "",
        })}}
        onSubmit={this.onSubmitPassword()}
        error={this.state.error}
        loading={this.props.store.authPassword.loading}
      />
    );
  }
  render() {
    console.log(this.props);
    const { emailValid } = this.state;
    return (
      <div className="step-1">
        <p className="text-header">studybox.io</p>
        {emailValid === false ? (
          this.getEmailView()
        ) : (
          this.getPasswordView()
        )}
      </div>
    )
  }
}

function validateEmail(e){
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(e);
}
function mapStateToProps(store, props) {
  return {store,props}
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, bindActionCreators({ submitEmail, submitPassword }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)