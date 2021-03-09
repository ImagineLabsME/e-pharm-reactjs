// npm packages
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";

// components
import Sidebar from "./sidebar";
import Header from "./header";
import Error404 from "./error404";
import Homepage from "./homepage";
import Contact from "./contact";
import AddListing from "./listings/add/AddListing";

const App = () => {
  const [cookie, setCookie] = useCookies(["language"]);
  const [isSidebar, setSidebar] = useState(false);

  if (cookie.language === undefined) {
    setCookie("language", "AR", { path: "/" });
  }

  useEffect(() => {
    const htmlTag = document.querySelector("html");

    if (cookie.language !== undefined) {
      if (cookie.language === "AR") {
        htmlTag.setAttribute("dir", "rtl");
        htmlTag.setAttribute("lang", "ar");
      } else {
        htmlTag.setAttribute("dir", "ltr");
        htmlTag.setAttribute("lang", "en");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookie.language]);

  const toggleSidebar = () => {
    setSidebar(!isSidebar);
  };

  return (
    <BrowserRouter>
      {isSidebar ? <Sidebar toggleSidebar={ toggleSidebar } /> : ""}

      <div
        id="router-components"
        style={{ margin: isSidebar ? "" : "var(--header-height) 0 0" }}
      >
        <Header toggleSidebar={ toggleSidebar } isSidebar={ isSidebar } />

        <Switch>
          <Route exact path="/" component={ Homepage } />
          <Route exact path="/listing/add" component={ AddListing } />
          <Route exact path="/contact" component={ Contact } />
          <Route path="*" component={ Error404 } />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
