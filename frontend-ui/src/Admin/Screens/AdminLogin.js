import React from "react";
import '../../temp.css';

const AdminLogin = () =>{

    return(
        <div className="App">
            <div className="container-fluid pt-5">
                <h2>Admin log in</h2>
                <div className="container pt-3">
                    <div className="container pt-4 form-background">
                    <form>
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
                        <div className='row py-3 my-1'>
                            <div className='col-md-3 '>
                                <button type="submit" className='btn btn-success'>Login</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AdminLogin;