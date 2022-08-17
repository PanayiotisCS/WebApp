import React, {useState} from "react";
import DashboardHeader from "../../component/DashboardHeader";
import DynamicForm from "../../component/DynamicForm";
import {Container, Button, Col, Row} from "react-bootstrap";
import {BiArrowBack} from "react-icons/bi";
import SideBar from "../../component/SideBar";
import { SurveyCreatorWidget } from "../component/SurveyCreatorWidget";

const AdminDashboard = () => {

    const [isActive, setActive] = useState("false");

    const ToggleForm = () => {
        setActive(!isActive);
    };
    return(
        
        <div className="App">
            <DashboardHeader />
            <div className="container-fluid">
                <div className="row">
                    {/* <SideBar page={'Dashboard'}/> */}
                    {/* <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"> */}
                    <main>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                        </div>
                        <div className=" justify-content-between flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            {
                                isActive ? 
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Button type="button" className="btn btn-primary ">Forms</Button>
                                            </Col>
                                            <Col>
                                                <Button type="button" className="btn btn-primary " onClick={ToggleForm}>Create New Form</Button>
                                            </Col>
                                            <Col lg="8">
                                            </Col>
                                        </Row>
                                    </Container>
                                    :
                                    <>
                                    <div className="d-flex">
                                        <Button type="button" className="btn btn-primary float-start" onClick={ToggleForm}><BiArrowBack />Back</Button>
                                    </div>
                                        <DynamicForm />
                                    </> 
                                    
                            }
                        </div>
                        {/* <SurveyCreatorWidget /> */}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;