import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "../auth";

const ServicesRoutesPrivate = ({ component: Component, ...rest }) => {
  let authenticated = isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
                redirectOnAuthenticated: true,
              },
            }}
          />
        )
      }
    />
  );
};

export default ServicesRoutesPrivate;
