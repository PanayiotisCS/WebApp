import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "../../../Screens/Dashboard";
import auth from "./auth";

export const ProtectedRoute = ({children}) => {
    // auth.isTokenExpired();
    return auth.isAuthenticated() ? children : <Navigate to={{pathname: "/"}} />;
};