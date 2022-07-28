import React from "react";
import { useLocation } from "react-router-dom";
import DashboardHeader from "../component/DashboardHeader";
import DashboardMainBody from "../component/DashboardMainBody";
import SideBar from "../component/SideBar";

function Dashboard() {
    const location = useLocation();
    // const { data } = route.params;
    console.log(location.state.data);
    const objData = JSON.parse(location.state.data);


    return(
        <div className="App">
            <DashboardHeader />
            <div className="container-fluid">
                <div className="row">
                    <SideBar page={'Dashboard'}/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Welcome {objData.email}</h1>
                        </div>
                        <DashboardMainBody />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;