import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthEmail from './containers/AuthEmail';

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={AuthEmail} />
        <Route path="/login" component={AuthEmail} />
    </Router>
  );
}

export default AppRouter;