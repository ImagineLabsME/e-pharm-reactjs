// npm packages
import React from "react";
import { useCookies } from "react-cookie";

// styles
import "./index.css";

const Header = ({ isSidebar, toggleSidebar }) => {
  const [cookie, setCookie] = useCookies(["language"]);

  const handleSelectChange = (event) => {
    setCookie("language", event.target.value, { path: "/" });
  };

  return (
    <div id="header">
      <div
        id="burger-menu"
        style={{ visibility: isSidebar ? "hidden" : "visible" }}
        onClick={ toggleSidebar }
      >
        <i className="fas fa-bars"></i>
      </div>

      <div id="switch-language">
        <select
          name="language"
          value={ cookie.language }
          onChange={ handleSelectChange }
        >
          <option value="AR">Arabic</option>
          <option value="EN">English</option>
        </select>
      </div>

      <div id="header-logo">
        <img
          src={`${window.location.origin}/assets/imagineLabs-logo.svg`}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Header;
