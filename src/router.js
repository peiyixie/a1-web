import React from "react";
import { Router, Route, Switch } from "dva/router";
//buyer
import IndexPage from "./routes/IndexPage";
import LoginBuyer from "./routes/LoginBuyer";
import RegistrationPage from "./routes/RegistrationPage";

//seller
import IndexPageSeller from "./routes/IndexPageSeller";
import LoginSeller from "./routes/LoginSeller";
import RegistrationSeller from "./routes/RegistrationSeller";
import AddItemPage from "./routes/AddItemPage";
import EditItemPage from "./routes/EditItemPage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {/* buyer */}
        <Route path="/" exact component={IndexPage} />
        <Route path="/buyers/login" exact component={LoginBuyer} />
        <Route path="/buyers/register" exact component={RegistrationPage} />
        {/* seller */}
        <Route path="/sellers" exact component={IndexPageSeller} />
        <Route path="/sellers/login" exact component={LoginSeller} />
        <Route path="/sellers/register" exact component={RegistrationSeller} />
        <Route path="/sellers/addItem" exact component={AddItemPage} />
        <Route path="/sellers/editItem" exact component={EditItemPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
