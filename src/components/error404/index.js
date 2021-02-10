// npm packages
import React from "react";
import { Link } from "react-router-dom";

// styles
import "./index.css";

const Error404 = () => {
  return (
    <section id="page-404">
      <div className="content-container">
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable
        </p>
        <Link to="/">
          <button
            className="call-to-action-button"
            data-text="HOMEPAGE"
          ></button>
        </Link>
      </div>
    </section>
  );
};

export default Error404;
