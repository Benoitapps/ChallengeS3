import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ component: Component, isAdmin }, props) {
  return (
    <>
      {isAdmin ? <Component {...props} /> : <Navigate to="/unauthorized" />}
    </>
  );
}

export default AdminRoute;
