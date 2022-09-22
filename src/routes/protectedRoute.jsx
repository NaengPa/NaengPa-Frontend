import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isPublic }) => {
  const validation = isPublic || localStorage?.getItem("token");
  if (!validation) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
