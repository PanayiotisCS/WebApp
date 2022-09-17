import React, { useState } from "react";
import { useNavigate } from 'react-router';
import { Row, Col, Button, Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DashboardHeader from "../../component/DashboardHeader";
import { BiArrowBack } from "react-icons/bi";

function SettingsRegister() {

    const navigate = useNavigate();
    const [error, setError] = useState({
        Username: '',
        Password: '',
        confirmPassword: '',
        Fname: '',
        Lname: '',
        Email: '',
    });
    const initialValues = {
        Username: '',
        Password: '',
        confirmPassword: '',
        Fname: '',
        Lname: '',
        Email: '',
        Type: ''
    };
    const [data, setData] = useState(initialValues);

    const registerUrl = "https://localhost:7169/api/Users/signup";

    const Registration = async (e) => {
        e.preventDefault();
        const data1 = { Username: data.Username, Password: data.Password, Fname: data.Fname, Lname: data.Lname, Email: data.Email, Type: 'Admin' }

        try {
            const response = await axios.post(registerUrl, data1);
            console.log(response);
            toast.success('Account created! Please Log in', { autoClose: 3000 });
            navigate(-1)
        } catch (error) {
            alert(error.response.data.error)
        }
    }
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        validateInput(e);
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "Username":
                    if (value.length <= 0) {
                        stateObj[name] = "Please enter Username.";
                    }
                    break;

                case "Password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (value.length <= 5) {
                        stateObj[name] = "Please enter at least 6 characters."
                    } else if (data.confirmPassword && value !== data.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = data.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (data.Password && value !== data.Password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;

                case "Email":
                    if (value.length <= 0) {
                        stateObj[name] = "Please enter your email";
                    }
                    break;
                default:
                    break;
            }

            return stateObj;
        });
    }
    return (
        <div className="App">
            <DashboardHeader />
            <div className="container-fluid">
                <Row>
                    <main>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Register new Admin</h1>
                        </div>
                        <div className="justify-content-between flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <div className="d-flex">
                                <Col>
                                    <Button className="float-start" onClick={() => navigate(-1)}><BiArrowBack />Back</Button>
                                </Col>
                            </div>
                            <Container>
                                <form onSubmit={Registration}>
                                    <div className='input-group row mb-4'>
                                        <div className='col-sm-12 col-md-7 col-lg-5'>
                                            <h3> Admin Registration</h3>
                                        </div>
                                    </div>
                                    <fieldset>
                                        <div className='form-group row pt-2 m-auto'>
                                            <label htmlFor="username" className='col-sm-3 col-form-label'>Username</label>
                                            <div className='col-sm-9'>
                                                <input
                                                    type="text"
                                                    className='form-control'
                                                    name="Username"
                                                    placeholder="Username"
                                                    id="username"
                                                    onChange={onChange}
                                                    value={data.Username}
                                                    onBlur={validateInput}
                                                />
                                                {error.Username && <span className="err">{error.Username}</span>}
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className='form-group row pt-2 m-auto'>
                                            <label htmlFor="password" className='col-sm-3 col-form-label'>Password</label>
                                            <div className='col-sm-9'>
                                                <input
                                                    type="password"
                                                    name="Password"
                                                    className='form-control'
                                                    placeholder="Password"
                                                    id="password"
                                                    onChange={onChange}
                                                    value={data.Password}
                                                    onBlur={validateInput} />
                                                {error.Password && <span className="err">{error.Password}</span>}
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className='form-group row pt-2 m-auto'>
                                            <label htmlFor="password-repeat" className='col-sm-3 col-form-label'>Repeat Password</label>
                                            <div className='col-sm-9'>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    className='form-control'
                                                    placeholder="Confirm password"
                                                    id="password-repeat"
                                                    onChange={onChange}
                                                    value={data.confirmPassword}
                                                    onBlur={validateInput} />
                                                {error.confirmPassword && <span className="err">{error.confirmPassword}</span>}
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className='form-group row pt-2 m-auto'>
                                            <label htmlFor="fname" className='col-sm-3 col-form-label'>First Name</label>
                                            <div className='col-sm-9'>
                                                <input
                                                    type="text"
                                                    name="Fname"
                                                    className='form-control'
                                                    placeholder="First Name"
                                                    id="fname"
                                                    onChange={onChange}
                                                    value={data.Fname}
                                                    onBlur={validateInput} />
                                                {error.Fname && <span className="err">{error.Fname}</span>}
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className='form-group row pt-2 m-auto'>
                                            <label htmlFor="lname" className='col-sm-3 col-form-label'>Last Name</label>
                                            <div className='col-sm-9'>
                                                <input
                                                    type="text"
                                                    name="Lname"
                                                    className='form-control'
                                                    placeholder="Last Name"
                                                    id="lname"
                                                    onChange={onChange}
                                                    value={data.Lname}
                                                    onBlur={validateInput} />
                                                {error.Lname && <span className="err">{error.Lname}</span>}
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className='form-group row pt-2 m-auto'>
                                            <label htmlFor="email" className='col-sm-3 col-form-label'>Email</label>
                                            <div className='col-sm-9'>
                                                <input
                                                    type="email"
                                                    name="Email"
                                                    className='form-control'
                                                    placeholder="Email"
                                                    id="email"
                                                    onChange={onChange}
                                                    value={data.email}
                                                    onBlur={validateInput} />
                                                {error.Email && <span className="err">{error.Email}</span>}
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div className='row pt-3'>
                                        <div className='col-md-3 '>
                                            <button type="submit" className='btn btn-success'>Register</button>
                                        </div>
                                    </div>
                                </form>
                            </Container>
                        </div>
                    </main>
                </Row>
            </div>
        </div>
    )
}

export default SettingsRegister;