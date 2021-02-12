// npm packages
import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";

// others
import reportWebVitals from "./reportWebVitals";

// components
import App from "./components/App";

// styles
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
