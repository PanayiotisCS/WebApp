import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import '../../temp.css';

import 'react-toastify/dist/ReactToastify.css';
import auth from "../../component/router/protected/auth";
import AuthService from '../../services/AuthService';

const AdminLogin = () =>{

    const navigate = useNavigate();
    const initialValues = {
        Username: '',
        Password: '',
        Role: ''
    }
    
    const [data, setData] = useState(initialValues);

    const AdminLogin = async (e) => {
        e.preventDefault();
        const data1 = { Username: data.Username, Password: data.Password, Role: 'Admin' };
        const response = await auth.login(data1);
        
        if (response) {
            var res = await response.data;
            AuthService.handleLoginSuccess(response);
            navigate('/admin/Dashboard', {state: {data: JSON.stringify(res)} });
        } else {
            if (response.data.error) {
                toast.error(response.data.error);
            }
        }
    }
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    return(
        <div className="App">
            <div className="container-fluid pt-5">
                <h2>Admin log in</h2>
                <div className="container pt-3">
                    <div className="container pt-4 form-background">
                    <form onSubmit={AdminLogin}>
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