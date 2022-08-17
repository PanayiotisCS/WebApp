import React from "react";
import {Navigate} from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({children}) => {
    // auth.isTokenExpired();
    return auth.isAuthenticated() ? children : <Navigate to={{pathname: "/"}} />;
};