import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./authUtils";

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    // Force redirect to login page if they aren't authenticated
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
}
