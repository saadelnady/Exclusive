import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("TOKEN");

  if (token) {
    // لو موجود توكن، يحوله للدashboard (أو أي صفحة تريد)
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
