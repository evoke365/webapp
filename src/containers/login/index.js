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

const VIEW_EMAIL = 0;
const VIEW_PASSWORD = 1;

class Login extends Component{
  state = {
    email: "",
    password: "",
    error: "",
    view: VIEW_EMAIL,
  }
  componentDidMount() {
    if(loadState()) {
      if(typeof(loadState().email)!="undefined" && 
        typeof(loadState().token)!="undefined"){
      }
    }
  }
  componentDidUpdate() {
    if (this.state.view === VIEW_EMAIL) {
      const { email, error } = this.props.store.authEmail;
      if (email !== "") {
        this.setState({
          email: "",
          password: "",
          error: "",
          view: VIEW_PASSWORD,
        })
      }
      if (error !== "" && this.state.error === "") {
        this.setState({
          error: EMAIL_NOT_FOUND_ERROR,
        })
      }
    }
    if (this.state.view === VIEW_PASSWORD) {
      console.log(this.props.store)
      const { token, error } = this.props.store.authPassword;
      if (token !== "") {
        saveState({
          "email": this.props.store.authEmail.email,
          "token": token
        });
        this.props.history.push("/home");
      }
      if (error !=="" && this.state.error === "") {
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
    const { email } = this.props.store.authEmail;
    this.props.submitPassword(email, this.state.password);
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
    const { email } = this.props.store.authEmail;
    return (
      <PasswordContainer
        email={email}
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
        onSubmit={(e) => this.onSubmitPassword()}
        error={this.state.error}
        loading={this.props.store.authPassword.loading}
      />
    );
  }
  render() {
    console.log(this.props);
    const { view } = this.state;
    return (
      <div className="step-1">
        <p className="text-header">studybox.io</p>
        {view === VIEW_PASSWORD ? this.getPasswordView() : this.getEmailView()}
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