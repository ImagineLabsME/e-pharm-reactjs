// npm packages
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

// styles
import "./index.css";

const Sidebar = ({ toggleSidebar }) => {
  const [cookie] = useCookies(["language"]);
  const [localization, setLocalization] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/content/pages/`,
        {
          params: {
            lang: cookie.language,
            page_name: "sidebar",
          },
        }
      );

      setLocalization(res.data);
    };

    fetchData();
  }, [cookie.language]);

  return (
    <nav id="sidebar">
      <ul className="sidebar-unordered-list">
        <li className="sidebar-list-item" onClick={ toggleSidebar } id="close-sidebar">
          <span>{ localization.sidebar_item_1 }</span>
          <i className="fas fa-times"></i>
        </li>

        <li className="sidebar-list-item" onClick={ toggleSidebar }>
          <Link className="sidebar-link" to="/">
            <span>{ localization.sidebar_item_2 }</span>
            <i className="fas fa-home"></i>
          </Link>
        </li>

        <li className="sidebar-list-item" onClick={ toggleSidebar }>
          <Link className="sidebar-link" to="/listings/view">
            <span>{ localization.sidebar_item_3 }</span>
            <i className="fas fa-list"></i>
          </Link>
        </li>

        <li className="sidebar-list-item" onClick={ toggleSidebar }>
          <Link className="sidebar-link" to="/listings/add">
            <span>{ localization.sidebar_item_4 }</span>
            <i className="fas fa-plus"></i>
          </Link>
        </li>

        <li className="sidebar-list-item" onClick={ toggleSidebar }>
          <Link className="sidebar-link" to="/contact">
            <span>{ localization.sidebar_item_5 }</span>
            <i className="fas fa-hands-helping"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
