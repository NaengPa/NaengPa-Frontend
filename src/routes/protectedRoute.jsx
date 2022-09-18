import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isPublic }) => {
  console.log(isPublic);
  const validation = isPublic || localStorage?.getItem("token");
  console.log(validation);
  if (!validation) {
    console.log("hi");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
