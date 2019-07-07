import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthContainer from './containers/auth'
import LoginContainer from './containers/auth/login';
import SignupContainer from './containers/auth/signup';
import VerifyContainer from './containers/auth/verify';
import Home from './containers/Home';

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={AuthContainer} />
        <Route path="/signin" component={LoginContainer} />
        <Route path="/signup" component={SignupContainer} />
        <Route path="/verify" component={VerifyContainer} />
        <Route path="/home" component={Home} />
    </Router>
  );
}

export default AppRouter;