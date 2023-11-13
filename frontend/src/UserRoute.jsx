import React from "react";
import { Navigate } from "react-router-dom";

function UserRoute({ component: Component, isConnected }, props) {
    return (
        <>
            {isConnected ? <Component {...props} /> : <Navigate to="/login" />}
        </>
    );
}

export default UserRoute;
