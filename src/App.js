import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthContainer from './containers/auth'
import LoginContainer from './containers/auth/login';
import SignupContainer from './containers/auth/signup';
import VerifyContainer from './containers/auth/verify';
import ForgetContainer from './containers/auth/forget';
import HomeContainer from './containers/home';
import RevisionContainer from './containers/revision';

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={AuthContainer} />
        <Route path="/signin" component={LoginContainer} />
        <Route path="/signup" component={SignupContainer} />
        <Route path="/verify" component={VerifyContainer} />
        <Route path="/forget" component={ForgetContainer} />
        <Route path="/home" component={HomeContainer} />
        <Route path="/revision" component={RevisionContainer} />   
      </Router>
  );
}

export default AppRouter;