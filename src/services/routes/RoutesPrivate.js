import React from "react";
import { Route, Redirect } from "react-router-dom";

import api from "../api";
import { getToken, isAuthenticated, logout } from "../auth";

const ServicesRoutesPrivate = ({ component: Component, isLogged, ...rest }) => {
  let authenticated = isAuthenticated();
  const token = getToken();

  if (token) {
    api
      .get("/api/v1/user/token")
      .then(function (resp) {
        if (resp.err) {
          logout();
          isLogged();
          authenticated = false;
        }

        return authenticated;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  }

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
