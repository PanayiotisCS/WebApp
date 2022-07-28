import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../services/AuthService";


const logout = (e) => {
    e.preventDefault();
    // const response = await AuthService.doUserLogout();
    const response = AuthService.handleLogoutSuccess();
    if(response){
        // AuthService.handleLogoutSuccess();
        window.location.reload(true);
        Navigate('/');
    } else {
        if (response.data.error){
            toast.error(response.data.error);
        }
    }
}

const DashboardHeader = () => {
    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Form Submission</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                <a type="button" className="nav-link px-3" onClickCapture={logout}>Sign out</a>
                </div>
            </div>
            </header>
    );
};

export default DashboardHeader;