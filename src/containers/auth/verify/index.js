import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitCode } from '../../../actions/signup'
import { loadState, saveState } from '../../../localStorage'
import CodeContainer from './code'

const INVALID_CODE_ERROR = "The activation code you have enterred is invalid."


class VerifyContainer extends Component{
  state = {
    email: "",
    error: "",
    code: "",
  }
  componentDidMount() {
    let email = loadState("email")
    let pwd = loadState("password")
    console.log(pwd);
    if(typeof(email) === "undefined" || typeof(pwd) === "undefined") {
        this.props.history.push("/");
    }
    this.setState({
        email: email,
    })
  }
  componentDidUpdate() {
    const { email, token, error } = this.props.store.verifyUser;
    if(error !== "" && this.state.error === "") {
      this.setState({
          error: INVALID_CODE_ERROR,
      })
      return undefined;
    }
    if( email !== "" || token !=="" ){
      saveState("token", token);
      this.props.history.push("/home");
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
      />
    )
  }
  render() {
    return (
      <div className="step-1">
        <p className="text-header">studybox.io</p>
        <p className="text-email">Thank you. We have sent you a verification code to your email address.</p>
          {this.getView()}
      </div>
    )
  }
}

function mapStateToProps(store, props) {
  return {store,props}
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, bindActionCreators({ submitCode }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyContainer)