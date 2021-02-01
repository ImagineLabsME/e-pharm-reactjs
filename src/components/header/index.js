// npm packages
import React from "react";

// styles
import "./index.css";

const Header = ({ isSidebar, toggleSidebar }) => {
  return (
    <div id="header">
      <div
        id="burger-menu"
        style={{ visibility: isSidebar ? "hidden" : "visible" }}
        onClick={ toggleSidebar }
      >
        <i className="fas fa-bars"></i>
      </div>

      <div id="header-logo">
        <img src="./assets/imaginelabs-logo.svg" alt="logo" />
      </div>
    </div>
  );
};

export default Header;
