import React from "react";
import { Route, Redirect } from "react-router-dom";

import api from "../api";
import { getToken, isAuthenticated, logout } from "../auth";


const ServicesRoutesPrivate = ({ component: Component, isAuthed, ...rest }) => {
  let valided = isAuthenticated();
  const token = getToken();

  if (token) {
    api
      .post("/user/token", { token })
      .then(function (response) {
        const resp = response.data.verify;

        if (!resp) {
          logout();
          isAuthed();
          valided = resp;
        }

        return valided;
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
        valided ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
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
