// npm packages
import React from "react";
import { Link } from "react-router-dom";

// styles
import "./index.css";

const Sidebar = ({ toggleSidebar }) => {
  // ---------------------
  // split code later
  // ---------------------
  return (
    <nav id="sidebar">
      <ul>
        <li id="close-sidebar" onClick={ toggleSidebar }>
          <span>Close</span>
          <i className="fas fa-times"></i>
        </li>

        <li onClick={ toggleSidebar }>
          <Link to="/">
            <span>Home</span>
            <i className="fas fa-home"></i>
          </Link>
        </li>

        <li onClick={ toggleSidebar }>
          <Link to="/">
            <span>View Listings</span>
            <i className="fas fa-list"></i>
          </Link>
        </li>

        <li onClick={ toggleSidebar }>
          <Link to="/add-listing">
            <span>Add a Listing</span>
            <i className="fas fa-plus"></i>
          </Link>
        </li>

        <li onClick={ toggleSidebar }>
          <Link to="/">
            <span>Help</span>
            <i className="fas fa-hands-helping"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
