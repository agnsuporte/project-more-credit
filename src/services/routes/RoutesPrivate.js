import React from "react";
import { Route, Redirect } from "react-router-dom";

import getChekToken from "../chektoken";
import { getToken, isAuthenticated, logout } from "../auth";

const ServicesRoutesPrivate = ({ component: Component, ...rest }) => {
  let authenticated = isAuthenticated();

  // authenticated = async () => {
  //   console.log("É sério?");
  //   return await getChekToken();
  // };

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
