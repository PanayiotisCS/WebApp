import React from 'react';
import ReactDom from 'react-dom/client';
import { FaSignInAlt } from "react-icons/fa";

const Home = () =>{
    
    return(
        <div className='container pt-5'>
            <div className='row pt-5'>
                <div className='col-sm-6 pt-5'>
                <div className='card pt-2'>
                        <div className="">
                            <div className='card-body'>
                                <form>
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
                                        <label for="username" className='col-sm-3 col-form-label'>Username</label>
                                        <div className='col-sm-9'>
                                            <input type="text" className='form-control' id="username"></input>
                                        </div>
                                    </div>
                                    <div className='form-group row pt-2 m-auto'>
                                        <label for="password" className='col-sm-3 col-form-label'>Password</label>
                                        <div className='col-sm-9'>
                                            <input type="password" className='form-control' id="password"></input>
                                        </div>
                                    </div>
                                    <div className='row pt-3'>
                                        <div className='col-md-3 '>
                                            <button type="submit" className='btn btn-success'>Login</button>
                                        </div>
                                    </div>
                                </form>
                                <hr/>
                                <a href="/register">Don't have an account? Register here</a>       
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

export default Home;
