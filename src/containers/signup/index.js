import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitForm } from '../../actions/signup'
import { loadState, saveState } from '../../localStorage'
import FormContainer from './form'

const INVALID_EMAIL_ERROR = "Let’s try that again, the email address you have entered is invalid."
const EMAIL_FOUND_ERROR = "The email you have entered has already been registered."

class Signup extends Component{
  state = {
    email: "",
    password: "",
    error: "",
    submitted: false,
  }
  componentDidMount() {
    if(loadState()) {
      if(typeof(loadState().email)!="undefined" && 
        typeof(loadState().token)!="undefined"){
        //this.props.setView("home");
      }
    }
  }
  componentDidUpdate() {
  }
  onSubmit(){
    if (this.state.email === "" || validateEmail(this.state.email) === false) {
      this.setState({
        email: this.state.email,
        error: INVALID_EMAIL_ERROR,
      })
    } 
    const { email, loading, error, submitForm } = this.props;
    if (!loading && !error && !email) submitForm(this.state.email, this.state.password);
  }
  render() {
    return (
      <div className="step-1">
        <p className="text-header">studybox.io</p>
        <FormContainer 
        onTypingEmail={(e)=>{
          this.setState({
              email: e.target.value,
        })}}
        onTypingPassword={(e)=>{
            this.setState({
                password: e.target.value,
        })}}
        onSubmit={(e)=>{this.onSubmit()}}
        error={this.state.error} />
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
  return Object.assign({}, bindActionCreators({ submitForm }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)