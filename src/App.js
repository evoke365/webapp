import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './containers/login';
import Signup from './containers/signup';
import Home from './containers/Home';

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
    </Router>
  );
}

export default AppRouter;