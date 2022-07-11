import React, { useState } from "react";
import axios from "axios";
import Header from "../component/header";
import Footer from "../component/footer";
import { FaWpforms } from "react-icons/fa";
import "../temp.css";

function Register(props) {
    const [error, setError] = useState({
        username: '', 
        password: '', 
        confirmPassword: '',
        fname: '', 
        lname: '', 
        email: '', 
        studentNumber: '', 
        address: '', 
        city: '', 
        post: '', 
        phone: '' 
    })
    const [data, setData] = useState({ 
        Username: '', 
        Password: '', 
        confirmPassword: '',
        Fname: '', 
        Lname: '', 
        Email: '', 
        StudentNumber: '', 
        Address: '', 
        City: '', 
        Post: '', 
        Phone: '' 
    })
    const apiUrl = "http://https://localhost:7169/api/StudentLogin/registration";
    const Registration = (e) => {
        e.preventDefault();
        const data1 = { Username: data.Username, Password: data.Password, Fname: data.Fname, Lname: data.Lname, Email: data.Email, StudentNumber: data.StudentNumber, Address: data.Address, City: data.City, Post: data.Post, Phone: data.Phone }
        axios.post(apiUrl, data1)
            .then((result) => {
                console.log(result.data);
                if (result.data.Status == "Invalid")
                    alert('Invalid User');
                else
                    props.history.push('/Dashboard')
            })
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        setData({...data, [name]: value});
        validateInput(e);
    }

    const validateInput = e => {
        let {name, value} = e.target;
        setError(prev => {
            const stateObj = {...prev, [name]: "" };

            switch(name){
                case "username":
                    if(!value){
                        stateObj[name] = "Please enter Username.";
                    }
                    break;

                case "password":
                if (!value) {
                    stateObj[name] = "Please enter Password.";
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

                default:
                    break;
            }

            return stateObj;
        });
    }
    return (
        <div className="App">
            <Header />
            <div className='students-background ui-g" tabIndex={"-1"}'>
                <div className='container pt-5'>
                    <div className='row pt-5'>
                        <div className='col-sm-6 pt-5 m-auto'>
                        </div>
                        <div className="col-sm-6 pt-5">
                            <div className='card pt-2'>
                                <div className="">
                                    <div className='card-body'>
                                        <form onSubmit={Registration}>
                                            <div className='input-group row'>
                                                <div className='col-sm-12 col-md-7 col-lg-5'>
                                                    <h3><FaWpforms size={"26"} /> Registration</h3>
                                                </div>
                                            </div>
                                            <fieldset>
                                                <div className='form-group row pt-2 m-auto'>
                                                    <label htmlFor="username" className='col-sm-3 col-form-label'>Username</label>
                                                    <div className='col-sm-9'>
                                                        <input 
                                                            type="text" 
                                                            className='form-control' 
                                                            id="username"  
                                                            onChange={onChange} 
                                                            defaultValue={data.Username}
                                                            onBlur={validateInput} />
                                                            {error.username && <span className="err">{error.username}</span>}
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div className='form-group row pt-2 m-auto'>
                                                    <label htmlFor="password" className='col-sm-3 col-form-label'>Password</label>
                                                    <div className='col-sm-9'>
                                                        <input 
                                                            type="password" 
                                                            className='form-control' 
                                                            id="password"  
                                                            onChange={onChange} 
                                                            defaultValue={data.Password}
                                                            onBlur={validateInput} />
                                                            {error.password && <span className="err">{error.password}</span>}
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div className='form-group row pt-2 m-auto'>
                                                    <label htmlFor="password-repeat" className='col-sm-3 col-form-label'>Repeat Password</label>
                                                    <div className='col-sm-9'>
                                                        <input 
                                                            type="password" 
                                                            className='form-control' 
                                                            id="password-repeat" 
                                                            onChange={onChange}
                                                            defaultValue={data.confirmPassword}
                                                            onBlur={validateInput}/>
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
                                                            className='form-control' 
                                                            id="fname" 
                                                            onChange={onChange}
                                                            defaultValue={data.Fname}
                                                            onBlur={validateInput} />
                                                            {error.fname && <span className="err">{error.fname}</span>}
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div className='form-group row pt-2 m-auto'>
                                                    <label htmlFor="lname" className='col-sm-3 col-form-label'>Last Name</label>
                                                    <div className='col-sm-9'>
                                                        <input 
                                                            type="text" 
                                                            className='form-control' 
                                                            id="lname" 
                                                            onChange={onChange}
                                                            defaultValue={data.Lname}
                                                            onBlur={validateInput}></input>
                                                            {error.lname && <span className="err">{error.lname}</span>}
                                                    </div>
                                                </div>
                                            </fieldset>
                                            {/* <fieldset>
                                                <div className='form-group row pt-2 m-auto'>
                                                    <label htmlFor="email" className='col-sm-3 col-form-label'>Email</label>
                                                    <div className='col-sm-9'>
                                                        <input type="email" className='form-control' id="email"></input>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div className='form-group row pt-2 m-auto'>
                                                    <label htmlFor="studentNo" className='col-sm-3 col-form-label'>Student Number</label>
                                                    <div className='col-sm-9'>
                                                        <input type="number" className='form-control' id="studentNo" ></input>
                                                    </div>
                                                </div>
                                            </fieldset> */}
                                            {/* <fieldset>
                                                <div className='form-group row pt-2 m-auto'>
                                                    <label htmlFor="Address" className='col-sm-3 col-form-label'>Address</label>
                                                    <div className='col-sm-9'>
                                                        <input type="text" className='form-control' id="Address" ></input>
                                                    </div>
                                                </div>
                                                <div className='form-group row pt-2 m-auto'>
                                                    <label htmlFor="City" className='col-sm-3 col-form-label'>City</label>
                                                    <div className='col-sm-9'>
                                                        <input type="text" className='form-control' id="City" ></input>
                                                    </div>
                                                </div>
                                                <div className='form-group row pt-2 m-auto'>
                                                    <label htmlFor="post-code" className='col-sm-3 col-form-label'>Post code</label>
                                                    <div className='col-sm-9'>
                                                        <input type="text" className='form-control' id="post-code" ></input>
                                                    </div>
                                                </div>
                                            </fieldset> */}
                                            {/* <div className='form-group row pt-2 m-auto'>
                                                <label htmlFor="phone" className='col-sm-3 col-form-label'>Phone</label>
                                                <div className='col-sm-9'>
                                                    <input type="text" className='form-control' id="phone" ></input>
                                                </div>
                                            </div> */}
                                            <div className='row pt-3'>
                                                <div className='col-md-3 '>
                                                    <button type="submit" className='btn btn-success'>Register</button>
                                                </div>
                                            </div>
                                        </form>
                                        <hr />
                                        <a href="/">Already have an account? Login here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register;