import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./containers/Login"

function Index() {
  return <h2>Home</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={Index} />
        <Route path="/login/" component={Login} />
        <Route path="/users/" component={Users} />
    </Router>
  );
}

export default AppRouter;