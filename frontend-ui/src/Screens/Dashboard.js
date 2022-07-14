import React from "react";
import DashboardHeader from "../component/DashboardHeader";
import DashboardMainHeader from "../component/DashboardMainHeader";
import SideBar from "../component/SideBar";


function Dashboard() {
    return(
        <div className="App">
            <DashboardHeader />
            <div className="container-fluid">
                <div className="row">
                    <SideBar />
                    <DashboardMainHeader />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;