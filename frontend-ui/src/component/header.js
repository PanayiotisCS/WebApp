import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {

    return(
        <div className='container-fluid'>
            <nav className='navbar navbar-expand-sm navbar-dark  background fixed-top'>
                <div className="container-fluid">
                    <ul className='navbar-nav'>
                        <li className='nav-item-'>
                            <NavLink to='/home'>
                                <img className='line img-thumnail' src='/logo-white-stacked-en.svg' width={120}/>
                            </NavLink>
                                <h4 className='nav-header mx-3 pt-4'>Scholarship Submission</h4>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};


export default Header;