import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () =>{
    const navigate = useNavigate();
    
    const initialValues = {
        Username: '',
        Password: ''
    }
    const [userData, setUser] = useState();
    const [data, setData] = useState(initialValues);
    const loginUrl = "https://localhost:7169/api/Users/login";

    const Login = async (e) =>{
        e.preventDefault();
        const data1 = { Username: data.Username, Password: data.Password };

        try {
            const response = await axios.post(loginUrl, data1);
            console.log(response.data);
            // setUser(response.data);
            // localStorage.setItem('token', userData.data.accessToken);
            navigate('/Dashboard');
        } catch (error) {
            if(error.response){
                toast.error(error.response.data.error);
            }
        }
    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value});
    }
    return(
        <div className='container pt-5'>
            <div className='row pt-5'>
                <div className='col-sm-6 pt-5'>
                <div className='card pt-2'>
                        <div className="">
                            <div className='card-body'>
                                <form onSubmit={Login}>
                                    <div className='input-group row'>
                                        <div className='col-sm-4'>
                                            <h3><FaSignInAlt size={"26"}/> Login</h3>
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
                                <hr/>
                                <Link to={'/Register'} className="nav-link">Don't have an account? Register here</Link>       
                                <br/>
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Login;
