import React from "react";
import { Navigate } from "react-router-dom";
// import { useEffect } from "react";
// import { Navigate, useNavigate } from 'react-router-dom';

// code de base
// function ManagerRoute({ component: Component, isManager }, props) {
function ManagerRoute({ component: Component, isManager, ...props}) {
  return (
    <>
      {isManager ? <Component isManager={isManager} {...props} /> : <Navigate to="/unauthorized" />}
    </>
  );
}

// function ManagerRoute({ component: Component, isManager, companyStatus, path, ...rest }) {
//   const navigate = useNavigate();

//   // solution pas totalement fonctionnelle
//   // useEffect(() => {
//   //     if (companyStatus === 'none' || companyStatus === 'pending') {
//   //       console.log('should redirect to company');
//   //         navigate('/manager/company');
//   //     } else if (companyStatus === 'accepted' && path === 'company') {
//   //       console.log('should redirect to manager');
//   //         navigate('/manager');
//   //     }
//   // }, [companyStatus, navigate, path]);

//   // 2ème test solution pas totalement fonctionnelle
//   // if (companyStatus === 'none' || companyStatus === 'pending') {
//   //       console.log('should redirect to company');
//   //       return <Navigate to="/manager/company" />;
//   //   } else if (companyStatus === 'accepted' && path === 'company') {
//   //       console.log('should redirect to manager');
//   //       return <Navigate to="/manager" />;
//   //   }

//   // return <Route {...rest} element={<Component />} />;
//   return (
//         <>
//           {isManager ? <Component isManager={isManager} {...rest} /> : <Navigate to="/unauthorized" />}
//         </>
//       );
// }

export default ManagerRoute;
