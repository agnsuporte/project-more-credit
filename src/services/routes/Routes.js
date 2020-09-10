import React from "react";
import { Route, Switch } from "react-router-dom";
import { PageCreditForm, NotFound } from "../../pages";

// import ServicesRoutesPrivate from "./RoutesPrivate";

const ServicesRoutes = (props) => {
  // const { isAuthed, logged } = props;

  return (
    <Switch>
      <Route exact path="/" render={() => <PageCreditForm />} />

      {/* <ServicesRoutesPrivate
          path="/here"
          component={PageLocation}
          isAuthed={isAuthed}
        /> */}

      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default ServicesRoutes;
