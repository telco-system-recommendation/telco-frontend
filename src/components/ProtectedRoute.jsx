import React from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../services/authApi";

const ProtectedRoute = ({ children }) => {
  const session = getSession();

  if (!session || !session.access_token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
