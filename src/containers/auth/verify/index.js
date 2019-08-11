import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitCode } from '../../../actions/verify'
import { logout } from '../../../actions/logout'
import { loadState, saveState } from '../../../localStorage'
import CodeContainer from '../code'

const INVALID_CODE_ERROR = "The activation code you have enterred is invalid."

class VerifyContainer extends Component{
  state = {
    email: "",
    error: "",
    code: "",
    ctx: "",
  }
  componentDidMount() {
    var state;
    var ctx;
    if(this.props.location.state === undefined) {
      this.props.history.push("/");
    } else {
      state = this.props.location.state;
      if (state.hasOwnProperty('context')) {
        ctx = state.context;
      } else {
        this.props.history.push("/");
      }
    }
    let email = loadState("email")
    if(email === undefined) {
      this.props.history.push("/");
    }
    switch(ctx) {
      case "forget":
        break;
      default:
        let pwd = loadState("password")
        if(pwd === undefined) {
          this.props.history.push("/");
        }
        break;
    }
    this.setState({
        email: email,
        ctx: ctx,
    })
  }
  componentDidUpdate() {
    const { email, token, error } = this.props.store.verifyUser;
    const { ctx } = this.state;
    if(error !== "" && this.state.error === "") {
      this.setState({
          error: INVALID_CODE_ERROR,
      })
      return undefined;
    }
    if( email !== "" || token !== "" ){
      saveState("token", token);
      if (ctx !== undefined && ctx === "forget") {
        this.props.history.push("/forget");
        return undefined;
      }
      this.props.history.push("/home");
    }
  }
  componentWillUnmount() {
    // browser go back button is triggerred
    if(this.props.history.action === "POP") {
      this.props.logout();
    }
  }
  onSubmit(){
    const { email, code } = this.state;
    if (code === "") {
      this.setState({
        error: INVALID_CODE_ERROR,
      })
      return undefined;
    }
    this.props.submitCode(email, code);
  }
  getView(){
    const { loading } = this.props.store.verifyUser;
    return (
      <CodeContainer
        onKeyDown={(e)=>{
          if(e.keyCode === 13){
            this.submitCode();
          }
        }}
        onChange={(e)=>{
          this.setState({
            code: e.target.value,
            error: "",
          })
        }}
        onNext={(e)=>{this.onSubmit(e.target.value)}}
        error={this.state.error}
        loading={loading}
      />
    )
  }
  getContext(){
    const { ctx } = this.state;
    switch(ctx){
      case "signup":
        return <span><p>Thank you!</p><p>We have sent a verification code to your email address.</p></span>;
      case "login":
        return <span><p>Thank you!</p><p>We have sent a verification code to your email address.</p></span>
      case "forget":
        return <span><p>Please verify it's you.</p><p>We have sent a verification code to your email address.</p></span>
      default:
        break;
    }
  }
  render() {
    return (
      <div className="step-1">
        <p className="text-header">studybox.io</p>
        <div className="text-email">{this.getContext()}</div>
          {this.getView()}
      </div>
    )
  }
}

function mapStateToProps(store, props) {
  return {store,props}
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, bindActionCreators({ submitCode, logout }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyContainer)