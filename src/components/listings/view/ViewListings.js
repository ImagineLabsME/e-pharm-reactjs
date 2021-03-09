// npm packages
import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useCookies } from "react-cookie";

// styles
import "../index.css";

const ViewListings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [filteredListing, setFilteredListing] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [paginate, setPaginate] = useState(10);
  const [listingsLength, setListingsLength] = useState();
  const [submitMessage, setSubmitMessage] = useState("");
  const [cookie] = useCookies(["language"]);
  const [localization, setLocalization] = useState({});

  const fetchListings = async (paginate) => {
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

      const res = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/listing/view`,
        {
          params: {
            paginate: paginate,
          },
        }
      );

      setListingsLength(res.data.length);
      setListings(res.data.data);
    } catch (error) {
      setSubmitMessage(error.response.data.data.errorMessage);
    }
  };

  useEffect(() => {
    fetchListings(paginate);
  }, [paginate]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/content/pages/`,
        {
          params: {
            lang: cookie.language,
            page_name: "viewListings",
          },
        }
      );

      setLocalization(res.data);
    };

    fetchData();
  }, [cookie.language]);

  const fetchMoreData = () => {
    setPaginate(paginate + 10);
  };

  const resetData = () => {
    setPaginate(10);
  };

  const handleFilter = (event) => {
    const value = event.target.value;

    if (value === "") {
      setIsSearching(false);
      setFilteredListing(listings);
    } else {
      const result = listings.filter((listing) =>
        listing.medication_name.toLowerCase().includes(value.toLowerCase())
      );

      setIsSearching(true);
      setFilteredListing(result);
    }
  };

  useEffect(() => {
    setFilteredListing(listings);
  }, [listings]);

  const useStyles = makeStyles({
    table: {
      minWidth: 768,
    },
  });

  return (
    <section id="view-listing" className="page-section">
      <div className="listings-wrapper">
        <div
          style={{
            padding: "0 0 12px",
            display: "flex",
            alignItems: "center",
            margin: "0 -12px",
          }}
        >
          {!isSearching && (
            <div style={{ padding: "0 12px" }}>
              <button
                onClick={resetData}
                style={{
                  margin: "0",
                  width: "50px",
                  borderRadius: "100%",
                  pointerEvents: isLoading ? "none" : "",
                }}
                className="call-to-action-button"
              >
                <i className={`fas fa-redo ${isLoading && "refresh"}`}></i>
              </button>
            </div>
          )}
          <div
            style={{ padding: "0 12px", display: "flex", alignItems: "center" }}
          >
            <i
              className="fas fa-search"
              style={{ color: "var(--base-color)", fontSize: "24px" }}
            ></i>
            <input
              type="text"
              placeholder={cookie.language === "EN" ? "Search" : "إبحث"}
              onChange={handleFilter}
              className="search-field"
            />
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table className={useStyles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{localization.name_table_cell}</TableCell>
                <TableCell>{localization.location_table_cell}</TableCell>
                <TableCell>{localization.medication_name_table_cell}</TableCell>
                <TableCell>{localization.quantity_table_cell}</TableCell>
                <TableCell>{localization.actions_label_cell}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredListing &&
                filteredListing.map((listing) => (
                  <TableRow key={listing["_id"]}>
                    <TableCell>{listing.name}</TableCell>
                    <TableCell>{listing.location}</TableCell>
                    <TableCell>{listing.medication_name}</TableCell>
                    <TableCell>{listing.quantity}</TableCell>
                    <TableCell>
                      <a
                        target="_blank"
                        href={`https://wa.me/${listing.phone}`}
                        rel="noopener noreferrer"
                        style={{ color: "var(--base-color)" }}
                      >
                        {localization.provide_action + " "}
                        <i className="fas fa-hand-holding-medical"></i>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <p
          style={{
            textAlign: "center",
            margin: "20px 0",
            color: "var(--danger)",
          }}
        >
          {submitMessage}
        </p>

        {listingsLength !== listings.length && !isSearching && (
          <button
            style={{ marginTop: "20px" }}
            className={`call-to-action-button margin-center ${
              isLoading ? "call-to-action-loading-button" : ""
            }`}
            data-text={localization.load_more_button}
            onClick={fetchMoreData}
            tabIndex={`${isLoading ? "-1" : ""}`}
          ></button>
        )}
      </div>
    </section>
  );
};

export default ViewListings;
