import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage";
import LoginBuyer from "./routes/LoginBuyer";
import RegistrationPage from "./routes/RegistrationPage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/buyers/login" exact component={LoginBuyer} />
        <Route path="/buyers/register" exact component={RegistrationPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
