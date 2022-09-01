import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import DashboardHeader from "../component/DashboardHeader";
import FormsTable from "../component/FormsTable";
import { BiArrowBack } from "react-icons/bi";


function Dashboard() {
    const location = useLocation();
    // const { data } = route.params;

    const [isAdmin, setIsAdmin] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const objData = JSON.parse(location.state.data);


    const checkRole = () => {
        var flag = false;
        if (objData.role === 'admin') {
            flag = true;
        }

        setIsAdmin(flag);
    }

    useEffect(() => {
        checkRole();
        console.log(objData);
    }, [])

    return (
        <div className="App">

            <DashboardHeader />
            <div className="container-fluid">
                <div className="row">
                    {/* <SideBar page={'Dashboard'}/>c */}
                    <main>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Welcome {objData.email}</h1>
                        </div>
                        
                        <div className=" justify-content-between flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            {isActive ?
                                <>
                                    <h3 className="border-bottom mt-5 pb-5">In this page you can see all available forms, and complete them if you haven't done yet.</h3>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Button type="button" className="btn btn-primary" onClick={() => setIsActive(false)}>Forms</Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </>
                                :
                                <>
                                    <div className="d-flex">
                                        <Button type="button" className="btn btn-primary float-start" onClick={() => setIsActive(true)}><BiArrowBack />Back</Button>
                                    </div>
                                    <FormsTable admin={isAdmin} userId={objData.userId}/>
                                </>
                            }
                        </div>
                        {/* <DashboardMainBody /> */}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;