import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("TOKEN");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
