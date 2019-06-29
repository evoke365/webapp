import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitEmail } from '../actions/authEmail'
import { loadState, saveState } from '../localStorage'

const INVALID_EMAIL_ERROR = "Let’s try that again, the email address you have entered is invalid"

class AuthEmail extends Component{
  state = {
    email: "",
    error: "",
  }
  componentDidMount() {
    if(loadState()) {
      if(typeof(loadState().email)!="undefined" && 
        typeof(loadState().token)!="undefined"){
        //this.props.setView("home");
      }
    }
    ReactDOM.findDOMNode(this.refs.emailInput).focus(); 
  }
  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.emailInput).focus(); 
  }
  onSubmit(){
    console.log(this.state);
    if (this.state.email === "" || validateEmail(this.state.email) === false) {
      this.setState({
        email: this.state.email,
        error: INVALID_EMAIL_ERROR,
      })
    } else {
      this.props.submitEmail(this.state.email);
      console.log(this.props);
    }
  }
  render() {
    var error = this.state.error;
    return (
      <div className="step-1">
        <p className="text-header">studybox.io</p>
        <div className="container-email-and-button clearfix">
          <input className={"_input"+(error === "" ? "" : " incorrect-input")} type="text" placeholder="Your email address" title="Use an email that is accessable on your mobile device." ref="emailInput" 
          onKeyDown={(e)=>{
            if(e.keyCode === 13){
                this.onSubmit();
              }
          }} 
          onChange={(e)=>{
            this.setState({
              email: e.target.value,
              error: "",
          })
          }}/>
          <p className={"text-error" + (error === "" ? "" : " text-error-visible" )}>{error}</p>
          <button className="_button" onClick={(e)=>{this.onSubmit()}}>next</button>
        </div>
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
)(AuthEmail)