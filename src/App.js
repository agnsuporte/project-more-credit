import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./services/routes/Routes";
import Bar from "./components/bar/Bar";
import getChekToken from "./services/chektoken";
import { isAuthenticated, logout } from "./services/auth";

import "./App.css";

function App() {
  const [logged, setLogged] = useState(isAuthenticated());
  const isLogged = () => setLogged(isAuthenticated());

  // // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjYxMjBlODQ2OTk5MzY4NTZlZjY5MjUiLCJuYW1lIjoiQW5hIE1hcmlhIiwiZW1haWwiOiJhbmFtYXJpYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MDA2MDM1MjEsImV4cCI6MTYwMDYxMDcyMX0.yel3MQsRQENe8NWtB-CK0CzgHjG4zdn--4s1PPVo5Jk

  useEffect(() => {
    const getToken = async () => {
      const token = await getChekToken();
      if (token.err) {
        logout();
      }
    };

    getToken();
  }, []);

  return (
    <BrowserRouter>
      <main style={{ marginTop: "75px" }}>
        <Bar logged={logged} isLogged={isLogged} />
        <Routes logged={logged} isLogged={isLogged} />
      </main>
    </BrowserRouter>
  );
}

export default App;
