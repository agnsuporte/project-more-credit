import React, { createContext, useState } from "react";
import { isAuthenticated } from "../services/auth";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(null);

  const getIsAuth = () => {
    setAuthenticated(isAuthenticated());
    return authenticated;
  };

  return (
    <Context.Provider value={{ getIsAuth, authenticated }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
