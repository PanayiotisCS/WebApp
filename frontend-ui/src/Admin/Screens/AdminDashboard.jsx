import React, {useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import DashboardHeader from "../../component/DashboardHeader";
import DynamicForm from "../../component/DynamicForm.tsx";
import {Container, Button, Col, Row} from "react-bootstrap";
import {BiArrowBack} from "react-icons/bi";
import SideBar from "../../component/SideBar";
import FormsTable from "../../component/FormsTable";

const AdminDashboard = (state) => {

    const location = useLocation();

    const [isActive, setActive] = useState("false");
    const [action, setAction ] = useState('');

    const ToggleForm = (act) => {
        setActive(!isActive);
        console.log(act);
        switch(act){
            case 'forms':
                setAction('forms');
                break;
            case 'create':
                setAction('create');
                break;
            case 'back':
                setAction('');
                break;
            default:
                break;
        }
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
                                isActive? 
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Button type="button" className="btn btn-primary" onClick={() => ToggleForm('forms')}>Forms</Button>
                                            </Col>
                                            <Col>
                                                <Button type="button" className="btn btn-primary" onClick={() => ToggleForm('create')}>Create New Form</Button>
                                            </Col>
                                            <Col lg="7">
                                            </Col>
                                        </Row>
                                    </Container>
                                    :
                                    <>
                                        <div className="d-flex">
                                            <Button type="button" className="btn btn-primary float-start" onClick={() => ToggleForm('back')}><BiArrowBack />Back</Button>
                                        </div>
                                        {action === 'forms' ? <FormsTable /> : <DynamicForm />}
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