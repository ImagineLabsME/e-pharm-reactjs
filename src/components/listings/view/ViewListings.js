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

// styles
import "../index.css";

const ViewListings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [paginate, setPaginate] = useState(10);
  const [listingsLength, setListingsLength] = useState();
  const [submitMessage, setSubmitMessage] = useState("");

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
      <h1>Listings</h1>

      <div className="listings-wrapper">
        <TableContainer component={ Paper }>
          <Table className={ useStyles.table } aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Medication Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Needed By</TableCell>
                <TableCell>Actions</TableCell>
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
                        I can Provide{" "}
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
            data-text="Load More"
            onClick={ fetchMoreData }
            tabIndex={`${isLoading ? "-1" : ""}`}
          ></button>
        )}
      </div>
    </section>
  );
};

export default ViewListings;
