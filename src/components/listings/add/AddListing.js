// npm packages
import React, { useState, useEffect } from "react";
import validator from "validator";
import axios from "axios";
import { useCookies } from "react-cookie";

// styles
import "../index.css";

const AddListing = () => {
  const [cookie] = useCookies(["language"]);
  const [localization, setLocalization] = useState({});

  const [data, setData] = useState({
    name: "",
    phone: "",
    location: "",
    medication_name: "",
    quantity: 1,
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
            dateError: localization.date_field_invalid,
          }));
    } else {
      setDataErrors((previousState) => ({
        ...previousState,
        dateError: localization.date_field_required,
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
            phoneError: localization.phone_field_invalid,
          }));
    } else {
      setDataErrors((previousState) => ({
        ...previousState,
        phoneError: localization.phone_field_required,
      }));
    }

    data.quantity
      ? setDataErrors((previousState) => ({
          ...previousState,
          quantityError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          quantityError: localization.quantity_field_required,
        }));

    data.name
      ? setDataErrors((previousState) => ({
          ...previousState,
          nameError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          nameError: localization.name_field_required,
        }));

    data.medication_name
      ? setDataErrors((previousState) => ({
          ...previousState,
          medicationNameError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          medicationNameError: localization.medication_name_field_required,
        }));

    data.location
      ? setDataErrors((previousState) => ({
          ...previousState,
          locationError: "",
        }))
      : setDataErrors((previousState) => ({
          ...previousState,
          locationError: localization.location_field_required,
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

          res.data.status === "success" && setData({
            name: "",
            phone: "",
            location: "",
            medication_name: "",
            quantity: 1,
            needed_by: "",
          });

          setSubmitMessage(res.data.data.message);
        } catch (error) {
          setSubmitMessage(error.response.data.data.errorMessage);
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
            page_name: "sidebar",
          },
        }
      );

      setLocalization(res.data);
    };

    fetchData();
  }, [cookie.language]);

  return (
    <section id="add-listings" className="page-section">
      <h1>{ localization.title_header }</h1>

      <form id="add-listings-form">
        <div className="form-input-container">
          <label className="form-input-label">{ localization.name_label }</label>
          <input
            name="name"
            type="text"
            className={`form-input ${
              dataErrors.nameError ? "form-input-error" : ""
            }`}
            value={ data.name }
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.nameError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">{ localization.phone_label }</label>
          <input
            name="phone"
            type="tel"
            className={`form-input ${
              dataErrors.phoneError
                ? dataErrors.phoneError === localization.phone_field_invalid
                  ? "form-input-warning"
                  : "form-input-error"
                : ""
            }`}
            value={ data.phone }
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.phoneError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">{ localization.location_label }</label>
          <input
            name="location"
            type="text"
            className={`form-input ${
              dataErrors.locationError ? "form-input-error" : ""
            }`}
            value={ data.location }
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.locationError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">{ localization.medication_name_label }</label>
          <input
            name="medication_name"
            type="text"
            className={`form-input ${
              dataErrors.medicationNameError ? "form-input-error" : ""
            }`}
            value={ data.medication_name }
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.medicationNameError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">{ localization.quantity_label }</label>
          <input
            name="quantity"
            type="number"
            className={`form-input ${
              dataErrors.quantityError ? "form-input-error" : ""
            }`}
            value={ data.quantity }
            onChange={ handleInputChange }
            min="1"
          />
          <span>{ dataErrors.quantityError }</span>
        </div>

        <div className="form-input-container">
          <label className="form-input-label">{ localization.needed_by_label }</label>
          <input
            name="needed_by"
            type="date"
            className={`form-input ${
              dataErrors.dateError
                ? dataErrors.dateError === localization.date_field_invalid
                  ? "form-input-warning"
                  : "form-input-error"
                : ""
            }`}
            value={ data.needed_by }
            onChange={ handleInputChange }
          />
          <span>{ dataErrors.dateError }</span>
        </div>

        <p style={{ textAlign: "center", margin: "12px 0" }}>{ submitMessage }</p>

        <button
          className={`call-to-action-button margin-center ${
            isLoading ? "call-to-action-loading-button" : ""
          }`}
          data-text={ localization.submit_button }
          onClick={ handleSubmit }
          tabIndex={ `${isLoading ? "-1" : ""}` }
        ></button>
      </form>
    </section>
  );
};

export default AddListing;
