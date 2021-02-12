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
      <ul className="sidebar-unordered-list">
        <li className="sidebar-list-item" onClick={ toggleSidebar } id="close-sidebar">
          <span>Close</span>
          <i className="fas fa-times"></i>
        </li>

        <li className="sidebar-list-item" onClick={ toggleSidebar }>
          <Link className="sidebar-link" to="/">
            <span>Home</span>
            <i className="fas fa-home"></i>
          </Link>
        </li>

        <li className="sidebar-list-item" onClick={ toggleSidebar }>
          <Link className="sidebar-link" to="/">
            <span>View Listings</span>
            <i className="fas fa-list"></i>
          </Link>
        </li>

        <li className="sidebar-list-item" onClick={ toggleSidebar }>
          <Link className="sidebar-link" to="/listings/add">
            <span>Add a Listing</span>
            <i className="fas fa-plus"></i>
          </Link>
        </li>

        <li className="sidebar-list-item" onClick={ toggleSidebar }>
          <Link className="sidebar-link" to="/">
            <span>Help</span>
            <i className="fas fa-hands-helping"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
