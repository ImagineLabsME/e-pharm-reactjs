// npm packages
import React from "react";
import DayPicker from "react-day-picker";

// styles
import "./index.css";
import "react-day-picker/lib/style.css";

const AddListing = () => {
  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    // const value = target.value;

    switch (name) {
      case "name":
        break;
      case "phone":
        break;
      case "location":
        break;
      case "medicationName":
        break;
      case "quantity":
        break;
      default:
        throw new Error("Invalid case");
    }
  };
  // ---------------------
  // split code later
  // ---------------------
  return (
    <section id="add-listings">
      <h1>Add a Listing</h1>
      <form id="add-listings-form">
        <div className="form-input-container">
          <label className="form-input-label">Name*</label>
          <input
            name="name"
            type="text"
            className="form-input"
            onChange={ handleInputChange }
          />
        </div>
        <div className="form-input-container">
          <label className="form-input-label">Phone*</label>
          <input
            name="phone"
            type="number"
            className="form-input"
            onChange={ handleInputChange }
          />
        </div>
        <div className="form-input-container">
          <label className="form-input-label">Location*</label>
          <input
            name="location"
            type="text"
            className="form-input"
            onChange={ handleInputChange }
          />
        </div>
        <div className="form-input-container">
          <label className="form-input-label">Medication name*</label>
          <input
            name="medicationName"
            type="text"
            className="form-input"
            onChange={ handleInputChange }
          />
        </div>
        <div className="form-input-container">
          <label className="form-input-label">Quantity*</label>
          <input
            name="quantity"
            type="number"
            className="form-input"
            onChange={ handleInputChange }
            min="1"
          />
        </div>
        <div className="date-form-input-wrapper">
          <label>Needed by*</label>
          <DayPicker />
        </div>
      </form>
    </section>
  );
};

export default AddListing;
