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

  const useStyles = makeStyles({
    table: {
      minWidth: 768,
    },
  });

  return (
    <section id="view-listing" className="page-section">
      <h1>{ localization.title_header }</h1>

      <div className="listings-wrapper">
        <TableContainer component={ Paper }>
          <Table className={ useStyles.table } aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{ localization.name_table_cell }</TableCell>
                <TableCell>{ localization.location_table_cell }</TableCell>
                <TableCell>{ localization.medication_name_table_cell }</TableCell>
                <TableCell>{ localization.quantity_table_cell }</TableCell>
                <TableCell>{ localization.created_at_table_cell }</TableCell>
                <TableCell>{ localization.needed_by_table_cell }</TableCell>
                <TableCell>{ localization.actions_label_cell }</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listings &&
                listings.map((listing) => (
                  <TableRow key={ listing["_id"] }>
                    <TableCell>{ listing.name }</TableCell>
                    <TableCell>{ listing.location }</TableCell>
                    <TableCell>{ listing.medication_name }</TableCell>
                    <TableCell>{ listing.quantity }</TableCell>
                    <TableCell>{ listing.createdAt }</TableCell>
                    <TableCell>{ listing.needed_by }</TableCell>
                    <TableCell>
                      <a
                        target="_blank"
                        href={`https://wa.me/${listing.phone}`}
                        rel="noopener noreferrer"
                        style={{ color: "var(--base-color)" }}
                      >
                        { localization.provide_action + " " }
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
          { submitMessage }
        </p>

        {listingsLength !== listings.length && (
          <button
            style={{ marginTop: "20px" }}
            className={`call-to-action-button margin-center ${
              isLoading ? "call-to-action-loading-button" : ""
            }`}
            data-text={ localization.load_more_button }
            onClick={ fetchMoreData }
            tabIndex={`${isLoading ? "-1" : ""}`}
          ></button>
        )}
      </div>
    </section>
  );
};

export default ViewListings;
