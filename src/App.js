import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthContainer from './containers/auth'
import LoginContainer from './containers/auth/login';
//import Signup from './containers/signup';
import Home from './containers/Home';

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={AuthContainer} />
        <Route path="/signin" component={LoginContainer} />
        {/* <Route path="/signup" component={Signup} /> */}
        <Route path="/home" component={Home} />
    </Router>
  );
}

export default AppRouter;