// npm packages
import React, { useState } from "react";
import validator from "validator";
import axios from "axios";

// styles
import "../index.css";

const AddListing = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    location: "",
    medication_name: "",
    quantity: "",
    needed_by: "",
  });

  const [dataErrors, setDataErrors] = useState({
    nameError: "",
    phoneError: "",
    locationError: "",
    medicationNameError: "",
    quantityError: "",
    dateError: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    switch (name) {
      case name:
        setData((previousState) => ({ ...previousState, [name]: value }));
        break;
      default:
        throw new Error("Invalid case");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitMessage("");
    const currentDate = new Date().getTime();
    const userDate = new Date(data.needed_by).getTime();
    const isPhone = validator.isMobilePhone(data.phone);

    if (data.needed_by) {
      currentDate < userDate
        ? setDataErrors((previousState) => ({
            ...previousState,
            dateError: "",
          }))
        : setDataErrors((previousState) => ({
            ...previousState,
            dateError: "Date must be greater than today",
          }));
    } else {
      setDataErrors((previousState) => ({
        ...previousState,
        dateError: "Date field is required",
      }));
    }

    if (data.phone) {
      isPhone
        ? setDataErrors((previousState) => ({
            ...previousState,
            phoneError: "",
          }))
        : setDataErrors((previousState) => ({
            ...previousState,
            phoneError: "Invalid phone number",
          }));
    } else {
      setDataErrors((previousState) => ({
        ...previousState,
        phoneError: "Phone field is required",
      }));
    }

    data.quantity
      ? setDataErrors((previousState) => ({
          ...previousState,
          quantityError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          quantityError: "Quantity field is required",
        }));

    data.name
      ? setDataErrors((previousState) => ({
          ...previousState,
          nameError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          nameError: "Name field is required",
        }));

    data.medication_name
      ? setDataErrors((previousState) => ({
          ...previousState,
          medicationNameError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          medicationNameError: "Medication name field is required",
        }));

    data.location
      ? setDataErrors((previousState) => ({
          ...previousState,
          locationError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          locationError: "Location field is required",
        }));

    if (
      data.medication_name &&
      data.name &&
      data.location &&
      data.quantity &&
      data.needed_by &&
      currentDate < userDate &&
      data.phone &&
      isPhone
    ) {
      const submitForm = async () => {
        try {
          const axiosInstance = axios.create();

          axiosInstance.interceptors.request.use(
            (config) => {
              setIsLoading(true);
              return config;
            },
            (error) => {
              return Promise.reject(error);
            }
          );

          axiosInstance.interceptors.response.use(
            (response) => {
              setIsLoading(false);
              return response;
            },
            (error) => {
              setIsLoading(false);
              return Promise.reject(error);
            }
          );

          const res = await axiosInstance.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/listing/add`,
            data
          );

          setSubmitMessage(res.data.data.message);
        } catch (error) {
          setSubmitMessage(error.response.data.data.errorMessage);
        }
      };

      submitForm();
    }
  };

  return (
    <section id="add-listings" className="page-section">
      <h1>Add a Listing</h1>

      <form id="add-listings-form">
        <div className="form-input-container">
          <label className="form-input-label">Name*</label>
          <input
            name="name"
            type="text"
            className={`form-input ${
              dataErrors.nameError ? "form-input-error" : ""
            }`}
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.nameError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">Phone*</label>
          <input
            name="phone"
            type="tel"
            className={`form-input ${
              dataErrors.phoneError
                ? dataErrors.phoneError === "Invalid phone number"
                  ? "form-input-warning"
                  : "form-input-error"
                : ""
            }`}
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.phoneError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">Location*</label>
          <input
            name="location"
            type="text"
            className={`form-input ${
              dataErrors.locationError ? "form-input-error" : ""
            }`}
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.locationError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">Medication name*</label>
          <input
            name="medication_name"
            type="text"
            className={`form-input ${
              dataErrors.medicationNameError ? "form-input-error" : ""
            }`}
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.medicationNameError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">Quantity*</label>
          <input
            name="quantity"
            type="number"
            className={`form-input ${
              dataErrors.quantityError ? "form-input-error" : ""
            }`}
            onChange={ handleInputChange }
            min="1"
          />
          <span>{ dataErrors.quantityError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">Needed By*</label>
          <input
            name="needed_by"
            type="date"
            className={`form-input ${
              dataErrors.dateError
                ? dataErrors.dateError === "Date must be greater than today"
                  ? "form-input-warning"
                  : "form-input-error"
                : ""
            }`}
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.dateError }</span>
        </div>

        <p style={{ textAlign: "center", margin: "12px 0" }}>{ submitMessage }</p>

        <button
          className={`call-to-action-button margin-center ${
            isLoading ? "call-to-action-loading-button" : ""
          }`}
          data-text="Submit"
          onClick={ handleSubmit }
          tabIndex={ `${isLoading ? "-1" : ""}` }
        ></button>
      </form>
    </section>
  );
};

export default AddListing;
