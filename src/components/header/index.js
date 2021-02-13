// npm packages
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

// styles
import "./index.css";

const Header = ({ isSidebar, toggleSidebar }) => {
  const [cookie, setCookie] = useCookies(["language"]);
  const [localization, setLocalization] = useState({});

  const handleSelectChange = (event) => {
    setCookie("language", event.target.value, { path: "/" });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/content/pages/`,
        {
          params: {
            lang: cookie.language,
            page_name: "header",
          },
        }
      );

      setLocalization(res.data);
    };

    fetchData();
  }, [cookie.language]);

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
          <option value="AR">{ localization.header_item_1 }</option>
          <option value="EN">{ localization.header_item_2 }</option>
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
