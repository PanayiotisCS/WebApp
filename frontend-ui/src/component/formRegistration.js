import React from "react";
import { FaWpforms } from "react-icons/fa";

const FormRegistration = () => {

    return(
        <div className='container pt-5'>
            <div className='row pt-5'>
                <div className='col-sm-6 pt-5 m-auto'>
                </div>
                <div className="col-sm-6 pt-5">
                <div className='card pt-2'>
                        <div className="">
                            <div className='card-body'>
                                <form>
                                    <div className='input-group row'>
                                        <div className='col-sm-12 col-md-7 col-lg-5'>
                                            <h3><FaWpforms size={"26"}/> Registration</h3>
                                        </div>
                                    </div>
                                    <div className='form-group row pt-2 m-auto'>
                                        <label for="username" className='col-sm-3 col-form-label'>Username</label>
                                        <div className='col-sm-9'>
                                            <input type="text" className='form-control' id="username" required="true"></input>
                                        </div>
                                    </div>
                                    <div className='form-group row pt-2 m-auto'>
                                        <label for="password" className='col-sm-3 col-form-label'>Password</label>
                                        <div className='col-sm-9'>
                                            <input type="password" className='form-control' id="password" required="true"></input>
                                        </div>
                                    </div>
                                    <div className='form-group row pt-2 m-auto'>
                                        <label for="password-repeat" className='col-sm-3 col-form-label'>Repeat Password</label>
                                        <div className='col-sm-9'>
                                            <input type="password" className='form-control' id="password-repeat" required="true"></input>
                                        </div>
                                    </div>
                                    <div className='form-group row pt-2 m-auto'>
                                        <label for="fname" className='col-sm-3 col-form-label'>First Name</label>
                                        <div className='col-sm-9'>
                                            <input type="text" className='form-control' id="fname" required="true"></input>
                                        </div>
                                    </div>
                                    <div className='form-group row pt-2 m-auto'>
                                        <label for="lname" className='col-sm-3 col-form-label'>Last Name</label>
                                        <div className='col-sm-9'>
                                            <input type="text" className='form-control' id="lname" required="true"></input>
                                        </div>
                                    </div>
                                    <div className='form-group row pt-2 m-auto'>
                                        <label for="email" className='col-sm-3 col-form-label'>Email</label>
                                        <div className='col-sm-9'>
                                            <input type="email" className='form-control' id="email" required="true"></input>
                                        </div>
                                    </div>
                                    <div className='form-group row pt-2 m-auto'>
                                        <label for="Address" className='col-sm-3 col-form-label'>Address</label>
                                        <div className='col-sm-9'>
                                            <input type="text" className='form-control' id="Address" required="true"></input>
                                        </div>
                                    </div>
                                    <div className='form-group row pt-2 m-auto'>
                                        <label for="City" className='col-sm-3 col-form-label'>City</label>
                                        <div className='col-sm-9'>
                                            <input type="text" className='form-control' id="City" required="true"></input>
                                        </div>
                                    </div>
                                    <div className='form-group row pt-2 m-auto'>
                                        <label for="post-code" className='col-sm-3 col-form-label'>Post code</label>
                                        <div className='col-sm-9'>
                                            <input type="text" className='form-control' id="post-code" required="true"></input>
                                        </div>
                                    </div>
                                    <div className='form-group row pt-2 m-auto'>
                                        <label for="phone" className='col-sm-3 col-form-label'>Phone</label>
                                        <div className='col-sm-9'>
                                            <input type="text" className='form-control' id="phone" required="true"></input>
                                        </div>
                                    </div>
                                    <div className='row pt-3'>
                                        <div className='col-md-3 '>
                                            <button type="submit" className='btn btn-success'>Register</button>
                                        </div>
                                    </div>
                                </form>
                                <hr/>
                                <a href="/">Already have an account? Login here</a>       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormRegistration;