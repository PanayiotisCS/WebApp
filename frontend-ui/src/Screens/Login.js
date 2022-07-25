import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CookieService from '../services/CookieService';
import AuthService from '../services/AuthService';
import Header from '../component/header';
import Footer from '../component/footer'

const Login = () => {
    const navigate = useNavigate();

    const initialValues = {
        Username: '',
        Password: ''
    }
    
    const [data, setData] = useState(initialValues);

    const UserLogin = async (e) => {
        e.preventDefault();
        const data1 = { Username: data.Username, Password: data.Password };
        console.log(data1);
        const response = await AuthService.doUserLogin(data1);
        if (response) {
            AuthService.handleLoginSuccess(response);
            navigate('/Dashboard');
        } else {
            if (response.data.error) {
                toast.error(response.data.error);
            }
        }
    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    return (
        <div className='App'>
            <Header />
            <div className='students-background ui-g' tabIndex={"-1"}>
                <div className='container pt-5'>
                    <div className='row pt-5'>
                        <div className='col-sm-6 pt-5'>
                            <div className='card pt-2'>
                                <div className="">
                                    <div className='card-body'>
                                        <form onSubmit={UserLogin}>
                                            <div className='input-group row'>
                                                <div className='col-sm-4'>
                                                    <h3><FaSignInAlt size={"26"} /> Login</h3>
                                                </div>
                                            </div>
                                            <div className='pt-2 row'>
                                                <div className='col'>
                                                    <p className='m-auto'>If you have <b>created an application or account</b> please log in here to access your application.</p>
                                                </div>
                                            </div>
                                            <div className='form-group row pt-2 m-auto'>
                                                <label htmlFor="username" className='col-sm-3 col-form-label'>Username</label>
                                                <div className='col-sm-9'>
                                                    <input
                                                        type="text"
                                                        name="Username"
                                                        className='form-control'
                                                        onChange={onChange}
                                                        value={data.Username}
                                                        id="username"
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group row pt-2 m-auto'>
                                                <label htmlFor="password" className='col-sm-3 col-form-label'>Password</label>
                                                <div className='col-sm-9'>
                                                    <input
                                                        type="password"
                                                        name="Password"
                                                        className='form-control'
                                                        onChange={onChange}
                                                        value={data.Password}
                                                        id="password"
                                                    />
                                                </div>
                                            </div>
                                            <div className='row pt-3'>
                                                <div className='col-md-3 '>
                                                    <button type="submit" className='btn btn-success'>Login</button>
                                                </div>
                                            </div>
                                        </form>
                                        <hr />
                                        <Link to={'/Register'} className="nav-link">Don't have an account? Register here</Link>
                                        <br />
                                        <a href="#">Forgot Password?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default Login;
