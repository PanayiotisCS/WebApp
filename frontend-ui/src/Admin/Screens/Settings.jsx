import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import DashboardHeader from '../../component/DashboardHeader';
import { BiArrowBack } from "react-icons/bi";

const Settings = () => {

    const navigate = useNavigate();
    return (
        <div className="App">
            <DashboardHeader />
            <div className="container-fluid">
                <Row>
                    <main>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Settings</h1>
                        </div>
                        <div className="justify-content-between flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <div className="d-flex">
                                <Col>
                                    <Button className="float-start" onClick={() => navigate(-1)}><BiArrowBack />Back</Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => navigate('/Settings/Register')}>Register new Admin</Button>
                                </Col>
                            </div>
                        </div>
                    </main>
                </Row>
            </div>
        </div>
    )
}

export default Settings;