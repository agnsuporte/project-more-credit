import React from "react";
import { Route, Switch } from "react-router-dom";
import ServicesRoutesPrivate from "./RoutesPrivate";

import {
  MainPage,
  Credit,
  CreditFormPage,
  SigninPage,
  NotFoundPage,
} from "../../pages";

const ServicesRoutes = (props) => {
  const { isLogged, logged } = props;

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => (
          <CreditFormPage {...props} logged={logged} isLogged={isLogged} />
        )}
      />

      <Route
        path="/login"
        render={(props) => <SigninPage {...props} isLogged={isLogged} />}
      />

      <ServicesRoutesPrivate path="/main" component={MainPage} />

      <ServicesRoutesPrivate path="/credit/:id" component={Credit} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default ServicesRoutes;
