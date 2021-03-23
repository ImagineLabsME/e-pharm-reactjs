// npm packages
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

// components
import ViewListings from "../listings/view/ViewListings";

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
            page_name: "home",
          },
        }
      );

      setLocalization(res.data);
    };

    fetchData();
  }, [cookie.language]);

  return (
    <>
      <section id="homepage">
        <h1 style={{ textAlign: "center" }}>{localization.title_header}</h1>

        <p>{localization.paragraph}</p>

        <div id="homepage-call-to-action-buttons">
          <Link to="/listing/add">
            <button
              className="call-to-action-button"
              data-text={localization.add_listing_button}
            ></button>
          </Link>
        </div>
      </section>
      <ViewListings />
    </>
  );
};

export default Homepage;
