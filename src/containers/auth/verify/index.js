import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitCode } from '../../../actions/verify'
import { logout } from '../../../actions/logout'
import { loadState, saveState } from '../../../localStorage'
import LogoContainer from '../logo'
import CodeContainer from '../code'
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles'

const INVALID_CODE_ERROR = "The activation code you have entered is invalid."

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
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
          <div>
            <LogoContainer />
              <div className={classes.message}>{this.getContext()}</div>
          </div>
        </Slide>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <div>
            {this.getView()}
          </div>
        </Slide>
      </div>
    )
  }
}

const style = theme => ({
  container: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '1024px',
    paddingTop: '10%',
  },
  message: {
    fontSize: '1.2em',
    color: '#000000',
    textAlign: 'center',
  },
})

function mapStateToProps(store, props) {
  return {store,props}
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, bindActionCreators({ submitCode, logout }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(VerifyContainer))