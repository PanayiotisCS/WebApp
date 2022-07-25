import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "../../../Screens/Dashboard";
import auth from "./auth";

export const ProtectedRoute = () => {
    return auth.isAuthenticated() ? <Dashboard /> : <Navigate to={{pathname: "/"}} />;
};