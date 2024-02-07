import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// code de base
// function ManagerRoute({ component: Component, isManager }, props) {
function ManagerRoute({ component: Component, isManager, ...props}) {
  const location = useLocation();

  console.log('location', location.pathname);
  console.log('companyStatus', props.companyStatus);


  if (location.pathname !== '/manager/company' && (props.companyStatus === 'none' || props.companyStatus === 'pending')) {
    return <Navigate to="/manager/company" />;
  } else if (location.pathname === '/manager/company' && props.companyStatus === 'accepted') {
    return <Navigate to="/manager" />;
  }
  return (
    <>
      {isManager ? <Component isManager={isManager} {...props} /> : <Navigate to="/unauthorized" />}
    </>
  );
}


export default ManagerRoute;
