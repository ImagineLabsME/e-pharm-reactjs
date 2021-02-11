// npm packages
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

// styles
import "./index.css";

const Homepage = () => {
  const [cookie] = useCookies(["language"]);
  const [localization, setLocalization] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/content/pages/`,
        {
          params: {
            lang: cookie.language,
            page_name: "homepage",
          },
        }
      );

      setLocalization(res.data);
    };

    fetchData();
  }, [cookie.language]);

  return (
    <section id="homepage">
      <h1>{ localization.title_header }</h1>

      <p>{ localization.paragraph }</p>

      <div id="homepage-call-to-action-buttons">
        <Link to="/listings/view">
          <button
            className="call-to-action-button"
            data-text={ localization.view_listings_button }
          ></button>
        </Link>

        <Link to="/listings/add">
          <button
            className="call-to-action-button"
            data-text={ localization.add_listing_button }
          ></button>
        </Link>
      </div>
    </section>
  );
};

export default Homepage;
