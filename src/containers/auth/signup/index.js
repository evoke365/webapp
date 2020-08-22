import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitPassword } from '../../../actions/signup'
import { logout } from '../../../actions/logout'
import { loadState, saveState } from '../../../localStorage'
import LogoContainer from '../logo'
import PasswordContainer from '../password'
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles'

const INVALID_PASSWORD_ERROR = "Let’s try that again, the password you have entered is invalid."

class SignupContainer extends Component{
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
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
          <div>
            <LogoContainer />
              <div className={classes.message}>It looks like you are new here. Let us sign you up!</div>
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
  return Object.assign({}, bindActionCreators({ submitPassword, logout }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(SignupContainer))