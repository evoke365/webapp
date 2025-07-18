import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleAuthContainer from './containers/auth/GoogleAuthContainer';
import HomeContainer from './containers/home';
import ProtectedRoute from './components/ProtectedRoute';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleAuthContainer />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <HomeContainer />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default AppRouter;