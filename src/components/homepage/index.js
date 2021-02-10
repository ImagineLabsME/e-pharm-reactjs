// npm packages
import React from "react";
import { Link } from "react-router-dom";

// styles
import "./index.css";

const Homepage = () => {
  return (
    <section id="homepage">
      <h1>Homepage</h1>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
        saepe quasi perspiciatis? Saepe ab consequuntur harum, voluptatem
        aspernatur magni ea?
      </p>

      <div id="homepage-call-to-action-buttons">
        <Link to="/listings/view">
          <button
            className="call-to-action-button"
            data-text="View listings"
          ></button>
        </Link>

        <Link to="/listings/add">
          <button
            className="call-to-action-button"
            data-text="Add Listing"
          ></button>
        </Link>
      </div>
    </section>
  );
};

export default Homepage;
