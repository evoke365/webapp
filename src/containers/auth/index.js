import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitEmail } from '../../actions/login'
import EmailContainer from './email'
import { saveState } from '../../localStorage'

const INVALID_EMAIL_ERROR = "Let’s try that again, the email address you have entered is invalid."

class AuthContainer extends Component{
  state = {
    email: "",
    error: "",
  }
  componentDidUpdate() {
    const { found } = this.props.store.authEmail;
    switch(found) {
      case 0:
        // redirect to sign up
        saveState("email", this.state.email)
        this.props.history.push("/signup");
        break;
      case 1:
        // redirect to login
        saveState("email", this.state.email)
        this.props.history.push("/signin");
        break;
      default:
        break; 
    }
  }
  onSubmit(){
    const { email } = this.state;
    if (email === "" || validateEmail(email) === false) {
      this.setState({
        error: INVALID_EMAIL_ERROR,
      });
      return undefined;
    }  
    this.props.submitEmail(email);
  }
  getView(){
    const { error } = this.state;
    return (
      <EmailContainer 
        onKeyDown={(e)=>{
          if(e.keyCode === 13){
              this.onSubmit();
            }
        }}
        onChange={(e)=>{
          this.setState({
              email: e.target.value,
              error: "",
        })}}
        onNext={(e)=>{this.onSubmit()}}
        error={error} 
      />
    );
  }
  render() {
    return (
      <div className="step-1">
        <p className="text-header">studybox.io</p>
        {this.getView()}
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
  return Object.assign({}, bindActionCreators({ submitEmail }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer)