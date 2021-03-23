// npm packages
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

// styles
import "./index.css";

const Error404 = () => {
  const [cookie] = useCookies(["language"]);
  const [localization, setLocalization] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/content/pages/`,
        {
          params: {
            lang: cookie.language,
            page_name: "notFound",
          },
        }
      );

      setLocalization(res.data);
    };

    fetchData();
  }, [cookie.language]);

  return (
    <section id="page-404">
      <div className="content-container">
        <h1>404</h1>

        <h3>{ localization.subtitle_header }</h3>

        <p>{ localization.paragraph }</p>

        <Link to="/">
          <button
            className="call-to-action-button"
            data-text={ localization.button }
          ></button>
        </Link>
      </div>
    </section>
  );
};

export default Error404;
