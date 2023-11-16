import React from "react";
import { Route, Navigate } from "react-router-dom";

function UserRoute({ component: Component, isConnected, onButtonClick, ...rest }) {
    return (
        <>
            {isConnected ? <Component onButtonClick={onButtonClick} {...rest} /> : <Navigate to="/login" />}
        </>
    );
}

export default UserRoute;
