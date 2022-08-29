import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';



const NotFound = () => {

    const navigate = useNavigate();
  return (
    <div className='App'>
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center row">
                <div className=" col-md-6">
                    <img src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg" alt=""
                        className="img-fluid" />
                </div>
                <div className=" col-md-6 mt-5">
                    <p className="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                    <p className="lead">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <Button onClick={() => navigate('/admin/Dashboard')} class="btn btn-primary">Home</Button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default NotFound