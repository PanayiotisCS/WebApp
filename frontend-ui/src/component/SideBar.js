import React from "react";
import { Navigate, Link } from "react-router-dom";

const SideBar = ({page}) => {
  if (page == 'Dashboard'){

    return(
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-1">
            <Link className="nav-link active" aria-current="page" to={'/Dashboard'}>
              <span data-feather="home"></span>
              Dashboard
            </Link>
          </li>
          <li className="nav-item mb-1">
            <Link className="nav-link" to={'/Forms'} style={{ textDecoration: 'none'}}>
              <span data-feather="bar-chart-2"></span>
              Submit new Form
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    );
  } else {
    return(
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-3">
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item mb-1">
              <Link className="nav-link" aria-current="page" to={'/Dashboard'} style={{ textDecoration: 'none'}}>
                <span data-feather="home"></span>
                Dashboard
              </Link>
            </li>
            <li className="nav-item mb-1">
              <Link className="nav-link active" to={'/Forms'} style={{ textDecoration: 'none'}}>
                <span data-feather="bar-chart-2"></span>
                Submit new Form
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      );
  }
}

export default SideBar;