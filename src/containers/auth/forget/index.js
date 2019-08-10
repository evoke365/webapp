import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { newPassword } from '../../../actions/forget'
import { logout } from '../../../actions/logout'
import { loadState, saveState } from '../../../localStorage'
import PasswordContainer from '../password'

const INVALID_PASSWORD_ERROR = "Let’s try that again, the password you have entered is invalid."

class ForgetContainer extends Component{
  state = {
    email: "",
    password: "",
    error: "",
  }
  componentDidMount() {
    let email = loadState("email")
    let token = loadState("token");
    if (email !== undefined && token !== undefined) {
      this.props.history.push("/home");
    }
    if(email === undefined) {
      this.props.history.push("/");
      return undefined;
    }
    if(token === undefined) {
      this.props.history.push("/");
      return undefined;
    }
    this.setState({
      email: email,
    })
  }
  componentDidUpdate() {
    const { success } = this.props.store.newPassword;
    switch(success) {
      case 1:
        // redirect to verify
        saveState("password", this.state.password)
        this.props.history.push({
          pathname: "/verify",
          state: { context: "signup" }
        });
        break;
      default:
        break; 
    }
  }
  componentWillUnmount() {
    // browser go back button is triggerred
    if(this.props.history.action === "POP") {
      this.props.logout();
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
    this.props.newPassword(email, password);
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
        <p className="text-email">Enter your new password</p>
          {this.getView()}
      </div>
    )
  }
}

function mapStateToProps(store, props) {
  return {store,props}
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, bindActionCreators({ newPassword, logout }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgetContainer)