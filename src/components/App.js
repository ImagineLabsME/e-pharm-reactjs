// npm packages
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { useCookies } from "react-cookie";

// components
import Sidebar from "./sidebar";
import Header from "./header";
import Error404 from "./error404";
import Homepage from "./homepage";
import AddListing from "./listings/add/AddListing";

const App = () => {
  // const [cookie, setCookie] = useCookies(["language"]);
  const [isSidebar, setSidebar] = useState(false);

  // useEffect(() => {
  //   setCookie("language", "AR", { path: "/" });
  // }, [setCookie]);

  const toggleSidebar = () => {
    setSidebar(!isSidebar);
  };

  return (
    <BrowserRouter>
      {isSidebar ? (
        <Sidebar toggleSidebar={ toggleSidebar } />
      ) : (
        ""
      )}

      <div
        id="router-components"
        style={{ margin: isSidebar ? "" : "var(--header-height) 0 0" }}
      >
        <Header toggleSidebar={ toggleSidebar } isSidebar={ isSidebar } />

        <Switch>
          <Route exact path="/" component={ Homepage } />
          <Route exact path="/listings/add" component={ AddListing } />
          <Route path="*" component={ Error404 } />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
