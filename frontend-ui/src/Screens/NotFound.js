import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component{

    render(){
        return (
            <div className='container'>
                <h2> Page not found.</h2>
                <Link to="/">Go to Home</Link>
            </div>
        )
    }
}

export default NotFound;