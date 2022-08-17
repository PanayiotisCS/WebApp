import React from "react";
import {Navigate} from "react-router-dom";
import auth from "./auth";

export const AdminProtectedRoute = ({children}) => {
    // auth.isTokenExpired();
    return auth.isAuthenticated() && auth.isAdmin() ? children : <Navigate to={{pathname: "/"}} />;
};