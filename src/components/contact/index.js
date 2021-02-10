// npm packages
import React, { useState } from "react";
import validator from "validator";
import axios from "axios";

// styles
import "./index.css";

const Contact = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [dataErrors, setDataErrors] = useState({
    fullNameError: "",
    emailError: "",
    messageError: "",
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
    const isEmail = validator.isEmail(data.email);

    if (data.email) {
      isEmail
        ? setDataErrors((previousState) => ({
            ...previousState,
            emailError: "",
          }))
        : setDataErrors((previousState) => ({
            ...previousState,
            emailError: "Invalid email",
          }));
    } else {
      setDataErrors((previousState) => ({
        ...previousState,
        emailError: "Email field is required",
      }));
    }

    data.fullName
      ? setDataErrors((previousState) => ({
          ...previousState,
          fullNameError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          fullNameError: "Name field is required",
        }));

    data.message
      ? setDataErrors((previousState) => ({
          ...previousState,
          messageError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          messageError: "Message field is required",
        }));

    if (data.fullName && data.message && data.email && isEmail) {
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
            `${process.env.REACT_APP_BACKEND_URL}/api/contact`,
            data
          );

          res.data.status === "success" && setData({
            fullName: "",
            email: "",
            message: "",
          });

          setSubmitMessage(res.data.message);
        } catch (error) {
          setSubmitMessage(error.response.data.errorMessage);
        }
      };

      submitForm();
    }
  };

  return (
    <section id="contact-us" className="page-section">
      <h1>contact</h1>

      <form className="contact-us-form">
        <div className="form-input-container">
          <label className="form-input-label">Name*</label>
          <input
            name="fullName"
            type="text"
            className={`form-input ${
              dataErrors.fullNameError ? "form-input-error" : ""
            }`}
            value={ data.fullName }
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.fullNameError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">Email*</label>
          <input
            name="email"
            type="email"
            className={`form-input ${
              dataErrors.emailError
                ? dataErrors.emailError === "Invalid email"
                  ? "form-input-warning"
                  : "form-input-error"
                : ""
            }`}
            value={ data.email }
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.emailError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">Message*</label>
          <textarea
            style={{ resize: "none", height: "auto" }}
            rows="5"
            name="message"
            className={`form-input ${
              dataErrors.messageError ? "form-input-error" : ""
            }`}
            value={ data.message }
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.messageError }</span>
        </div>

        <p style={{ textAlign: "center", margin: "12px 0" }}>{ submitMessage }</p>

        <button
          className={`call-to-action-button margin-center ${
            isLoading ? "call-to-action-loading-button" : ""
          }`}
          data-text="Submit"
          onClick={ handleSubmit }
          tabIndex={`${isLoading ? "-1" : ""}`}
        ></button>
      </form>
    </section>
  );
};

export default Contact;
