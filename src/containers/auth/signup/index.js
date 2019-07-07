import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitPassword } from '../../../actions/signup'
import { loadState, saveState } from '../../../localStorage'
import PasswordContainer from '../password'

const INVALID_PASSWORD_ERROR = "Let’s try that again, the password you have entered is invalid."

class SignupContainer extends Component{
  state = {
    email: "",
    password: "",
    error: "",
  }
  componentDidMount() {
    let email = loadState("email")
    if(email === "undefined") {
      this.props.history.push("/");
      return undefined;
    }
    this.setState({
      email: email,
    })
  }
  componentDidUpdate() {
    const { success } = this.props.store.newSignup;
    switch(success) {
      case 1:
        // redirect to verify
        saveState("password", this.state.password)
        this.props.history.push("/verify");
        break;
      default:
        break; 
    }
  }
  onSubmit(){
    const { email, password } = this.state;
    // TODO: Add password validation
    if (password === "") {
      this.setState({
        error: INVALID_PASSWORD_ERROR,
      });
      return undefined;
    }
    // TODO: handle http error
    this.props.submitPassword(email, password);
  }
  getView(){
    return (
      <PasswordContainer
        onKeyDown={(e)=>{
          if(e.keyCode === 13){
              this.onSubmit();
            }
        }}
        onChange={(e)=>{
          this.setState({
              password: e.target.value,
              error: "",
        })}}
        onSubmit={() => this.onSubmit()}
        error={this.state.error}
        loading={this.props.store.newSignup.loading}
      />
    );
  }
  render() {
    return (
      <div className="step-1">
        <p className="text-header">studybox.io</p>
        <p className="text-email">It looks like you are new here. Let us sign you up!</p>
          {this.getView()}
      </div>
    )
  }
}

function mapStateToProps(store, props) {
  return {store,props}
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, bindActionCreators({ submitPassword }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupContainer)