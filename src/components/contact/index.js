// npm packages
import React, { useState, useEffect } from "react";
import validator from "validator";
import { useCookies } from "react-cookie";
import axios from "axios";

// styles
import "./index.css";

const Contact = () => {
  const [cookie] = useCookies(["language"]);
  const [localization, setLocalization] = useState({});

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
            emailError: localization.email_field_invalid,
          }));
    } else {
      setDataErrors((previousState) => ({
        ...previousState,
        emailError: localization.email_field_required,
      }));
    }

    data.fullName
      ? setDataErrors((previousState) => ({
          ...previousState,
          fullNameError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          fullNameError: localization.full_name_field_required,
        }));

    data.message
      ? setDataErrors((previousState) => ({
          ...previousState,
          messageError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          messageError: localization.message_field_required,
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/content/pages/`,
        {
          params: {
            lang: cookie.language,
            page_name: "contact",
          },
        }
      );

      setLocalization(res.data);
    };

    fetchData();
  }, [cookie.language]);

  return (
    <section id="contact-us" className="page-section">
      <h1>{ localization.title_header }</h1>

      <form className="contact-us-form">
        <div className="form-input-container">
          <label className="form-input-label">{ localization.full_name_label }</label>
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
          <label className="form-input-label">{ localization.email_label }</label>
          <input
            name="email"
            type="email"
            className={`form-input ${
              dataErrors.emailError
                ? dataErrors.emailError === localization.email_field_invalid
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
          <label className="form-input-label">{ localization.message_label }</label>
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
          data-text={ localization.submit_button }
          onClick={ handleSubmit }
          tabIndex={`${isLoading ? "-1" : ""}`}
        ></button>
      </form>
    </section>
  );
};

export default Contact;
