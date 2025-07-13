import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = ({ navigateTo }) => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div>
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <NavLink to={navigateTo} className="btn btn-danger">
          Home page
        </NavLink>
      </div>
    </div>
  );
};
export default NotFoundPage;
