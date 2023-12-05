import React from "react";
import { Navigate } from "react-router-dom";

function ManagerRoute({ component: Component, isManager }, props) {
  return (
    <>
      {isManager ? <Component {...props} /> : <Navigate to="/unauthorized" />}
    </>
  );
}

export default ManagerRoute;
