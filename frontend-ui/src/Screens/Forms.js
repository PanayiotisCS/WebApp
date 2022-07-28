import React from "react";

import DashboardHeader from "../component/DashboardHeader";
import SideBar from "../component/SideBar";
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';


function Forms() {

    return(
        <div className="App">
            <DashboardHeader />
            <div className="container-fluid">
                <div className="row">
                    <SideBar page={'Forms'}/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Select a form</h1>
                        </div>
                        <div className="row mb-5">
                            <div className="col-md-6 col-lg-4 col-xl-2">
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        International Excellence Scholarships (Africa)
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Amount</th>
                                                    <th>Deadline</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>International Excellence Scholarships (Africa)</td>
                                                    <td>Up to £6,000</td>
                                                    <td>September 2022: Applications are now closed</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={3}>
                                                        <a>Submit form here</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-md-6 col-lg-4 col-xl-2">
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        International Excellence Scholarships (Rest of the world)
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Amount</th>
                                                    <th>Deadline</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>International Excellence Scholarships (Rest of the world)</td>
                                                    <td>Up to £6,000</td>
                                                    <td>September 2022: Applications are now open</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={3}>
                                                        <a>Submit form here</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );

};

export default Forms;