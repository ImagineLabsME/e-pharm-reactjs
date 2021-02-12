// npm packages
import React from "react";

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
        <button
          className="call-to-action-button"
          data-text="View listings"
        ></button>
        <button className="call-to-action-button" data-text="Add Listing"></button>
      </div>
    </section>
  );
};

export default Homepage;
